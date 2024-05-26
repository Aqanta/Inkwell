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
    <div style="width:82.5%">
      <Snip
          v-if="openContents.snipID"
          ref="snip"
          :theme="darkMode ? 'dark' : 'light'"
          :bookshelf="bookshelf"
          :openContents="openContents"
          @updateSnip="(snipID, delta) => updateSnip(snipID, delta)"
      />
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import Editor from "./components/editor/Editor.vue";
import Snip from "./components/editor/Snip.vue";
import Navbar from "./components/Navbar.vue";
</script>

<script>
import { v4 as uuid } from "uuid";

export default {
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
        placeholderName: `Snip ${Object.keys( this.bookshelf.collections[collectionID].snips ).length + 1}`
      }
      return id;
    },
    newCollection( name ) {
      let id = uuid();
      this.bookshelf.collections[id] = {
        name: name,
        id: id,
        snips: {}
      }
      return id;
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
