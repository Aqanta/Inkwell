<template>
  <Navbar
      :theme="darkMode ? 'dark' : 'light'"
      :bookshelf="bookshelf"
      :openContents="openContents"
      @themeChange="changeTheme"
  />
  <div :class="['is-flex is-flex-direction-row', {'theme-dark has-background-black' : darkMode}]"
       style="height: 100%"
       v-if="showApp"
  >
    <div class="pt-2 pl-2" style="width: 17.5%">
      <Sidebar
          :bookshelf="bookshelf"
          :openContents="openContents"
          @addSnip="newSnip"
          @changeSelection="changeSelection"
      />
    </div>
    <div class="is-flex-grow-1">
      <Snip
          v-if="openContents.snipID"
          ref="snip"
          :theme="darkMode ? 'dark' : 'light'"
          :bookshelf="bookshelf"
          :openContents="openContents"
          @updateSnip="(snipID, delta) => updateSnip(snipID, delta)"
      />
      <Collection
          v-else-if="openContents.collectionID"
          :bookshelf="bookshelf"
          :openContents="openContents"
          @openSnip="changeSelection"
          @addSnip="newSnip"
          @deleteSnip="deleteSnip"
      />
      <CollectionsList
          v-else
          :bookshelf="bookshelf"
          :openContents="openContents"
          @newCollection="newCollection"
          @deleteCollection="deleteCollection"
      />
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import { v4 as uuid } from "uuid";
import { defineAsyncComponent } from 'vue';

export default {
  name: "app",
  components: {
    Navbar: defineAsyncComponent( () => import("./components/Navbar.vue") ),
    Sidebar: defineAsyncComponent( () => import("./components/Sidebar.vue") ),
    CollectionsList: defineAsyncComponent( () => import("./components/CollectionsList.vue") ),
    Collection: defineAsyncComponent( () => import("./components/Collection.vue") ),
    Snip: defineAsyncComponent( () => import("./components/editor/Snip.vue") ),
  },
  data() {
    return {
      darkMode: false,
      bookshelf: {
        collections: {}
      },
      usingElectron: false,
      usingLocalStorage: storageAvailable( "localStorage" ),
      openContents: {
        collectionID: undefined,
        snipID: undefined
      },
      showApp: false
    }
  },
  methods: {
    changeTheme( theme ) {
      switch ( theme ) {
        case "light":
          this.darkMode = false;
          break;
        case "dark":
          this.darkMode = true;
          break;
      }
    },
    changeSelection( selection ) {
      if ( this.$refs['snip'] ) {
        this.updateSnip( this.openContents, this.$refs['snip'].getContents() );
      }
      this.openContents = selection;
    },
    updateSnip( { collectionID, snipID }, delta ) {
      this.bookshelf.collections[collectionID].snips[snipID].delta = delta;
      this.bookshelf.collections[collectionID].snips[snipID].updates = true;
    },
    newSnip( collectionID ) {
      console.log( 'newSnip', this.bookshelf.collections[collectionID] );
      let id = uuid();
      this.bookshelf.collections[collectionID].snips[id] = {
        name: '',
        id: id,
        delta: null,
        tags: [],
        categories: [],
        placeholderName: `Snip ${Object.keys( this.bookshelf.collections[collectionID].snips ).length + 1}`,
        stats: {
          words: 0
        },
        updates: true
      }
      return id;
    },
    newCollection( { name, emoji } ) {
      let id = uuid();
      this.bookshelf.collections[id] = {
        name: name,
        id: id,
        snips: {},
        emoji: emoji,
        updates: true
      }
      return id;
    },
    deleteSnip( { collectionID, snipID } ) {
      if ( this.usingElectron ) {
        electron.send( 'deleteSnip', { collectionID, snipID } );
      } else {
        this.saveLocalStorage();
      }
      delete this.bookshelf.collections[collectionID].snips[snipID];
    },
    deleteCollection( { collectionID } ) {
      if ( this.usingElectron ) {
        electron.send( 'deleteCollection', { collectionID } );
      } else {
        this.saveLocalStorage();
      }
      delete this.bookshelf.collections[collectionID];
    },
    saveCollection( { collectionID } ) {
      if ( this.usingElectron ) {
        electron.send( 'saveCollection',
            {
              collectionID,
              collection: JSON.parse( JSON.stringify( {
                ...this.bookshelf.collections[collectionID],
                snips: undefined,
                updates: undefined
              } ) )
            } );
        this.bookshelf.collections[collectionID].updates = false;
      } else {
        this.saveLocalStorage();
      }
    },
    saveSnip( { collectionID, snipID } ) {
      //TODO - make this not fire on every keypress
      if ( this.usingElectron ) {
        console.log( 'saveSnip', JSON.parse( JSON.stringify( this.bookshelf ) ) );
        electron.send( 'saveSnip',
            {
              collectionID,
              snipID,
              snip: JSON.parse( JSON.stringify( {
                ...this.bookshelf.collections[collectionID].snips[snipID],
                updates: undefined
              } ) )
            } );
        this.bookshelf.collections[collectionID].snips[snipID].updates = false;
      } else {
        this.saveLocalStorage();
      }
    },
    saveLocalStorage() {
      if ( this.usingLocalStorage ) {
        localStorage.setItem( "bookshelf", JSON.stringify( this.bookshelf ) );
      }
    }
  },
  async mounted() {
    try {
      this.usingElectron = !!electron;
    } catch ( e ) {
      this.usingElectron = false;
    }

    let save;
    if ( this.usingElectron ) {
      save = await electron.invoke( 'getData' );
    } else if ( this.usingLocalStorage ) {
      save = JSON.parse( localStorage.getItem( "bookshelf" ) );
    } else {
      alert( "Your browser does not support local storage. No changes are being saved" );
    }
    console.log( "save", save );

    //TODO load from LS
    if ( save && Object.keys( save.collections ).length > 0 ) {
      this.bookshelf = save;
    } else {
      this.openContents.collectionID = this.newCollection( { name: 'My Collection', emoji: '📖' } );
      this.openContents.snipID = this.newSnip( this.openContents.collectionID );
    }

    this.showApp = true;
  },
  watch: {
    bookshelf: {
      handler: function () {
        Object.values( this.bookshelf.collections ).forEach( c => {
          if ( c.updates ) {
            this.saveCollection( { collectionID: c.id } );
          }
          if ( c.snips ) {
            Object.values( c.snips ).forEach( s => {
              if ( s.updates ) {
                this.saveSnip( { collectionID: c.id, snipID: s.id } );
              }
            } )
          }
        } )
      },
      deep: true
    }
  }
}

function storageAvailable( type ) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem( x, x );
    storage.removeItem( x );
    return true;
  } catch ( e ) {
    return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === "QuotaExceededError" ||
            // Firefox
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
    );
  }
}

</script>
