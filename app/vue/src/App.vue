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
      this.saveData();
    },
    newSnip( collectionID ) {
      let id = uuid();
      this.bookshelf.collections[collectionID].snips[id] = {
        name: '',
        id: id,
        delta: null,
        tags: [],
        categories: [],
        placeholderName: `Snip ${ Object.keys( this.bookshelf.collections[collectionID].snips ).length + 1 }`,
        stats: {
          words: 0
        }
      }
      return id;
    },
    newCollection( name ) {
      let id = uuid();
      this.bookshelf.collections[id] = {
        name: name,
        id: id,
        snips: {},
        emoji: '📖'
      }
      return id;
    },
    deleteSnip( { collectionID, snipID } ) {
      delete this.bookshelf.collections[collectionID].snips[snipID];
      this.saveData();
    },
    saveData() {
      if ( this.usingElectron ) {
        electron.send( 'save', JSON.parse( JSON.stringify( this.bookshelf ) ) );
      } else {
        //TODO use local store
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
    }
    //TODO load from LS
    if ( save ) {
      this.bookshelf = save;
    } else {
      this.openContents.collectionID = this.newCollection( 'My Collection' );
      this.openContents.snipID = this.newSnip( this.openContents.collectionID );
    }

    this.showApp = true;
  }
}
</script>
