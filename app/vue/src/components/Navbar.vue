<template>
  <nav :class="['navbar', theme === 'light' ? 'has-background-primary-90' : 'has-background-primary-95-invert']"
       role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <span class="icon is-medium is-clickable" @click="openContents.collectionID = openContents.snipID = undefined">
          <img src="../assets/Inkwell.svg" alt="Inkwell">
        </span>
      </a>

      <a role="button" class="navbar-burger has-background-pri" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
             <span class="icon">
                 <FontAwesomeIcon :icon="theme === 'light' ? fas.faSun : fas.faMoon"/>
             </span>
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item" @click="$emit('themeChange','light')">
              <span class="icon">
                <FontAwesomeIcon :icon="fas.faSun"/>
              </span>
            </a>
            <a class="navbar-item" @click="$emit('themeChange','dark')">
               <span class="icon">
                 <FontAwesomeIcon :icon="fas.faMoon"/>
               </span>
            </a>
          </div>
        </div>
      </div>

      <div class="is-flex is-flex-direction-row" style="width: 60%">
        <div class="pl-2 my-3 is-flex-grow-1" v-if="openContents.snipID">
          <input class="input titleInput" type="text" :placeholder="snip.placeholderName" v-model="snip.name" @blur="snip.updates = true"/>
        </div>
        <div class="pl-2 my-3 is-flex-grow-1" v-else-if="openContents.collectionID">
          <span class="icon is-size-3" v-if="collection.title">
            {{ cardInfo.title }}
          </span>
          <input class="input titleInput" type="text" v-model="collection.name" @blur="collection.updates = true"/>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" v-if="openContents.snipID">
          <div class="buttons has-addons">
            <button class="button is-large" title="Find">
              <span class="icon is-large">
                <FontAwesomeIcon :icon="fas.faMagnifyingGlass"/>
              </span>
            </button>
            <button class="button is-large" title="Organize">
              <span class="icon is-large">
                <FontAwesomeIcon :icon="fas.faFolderPlus"/>
              </span>
            </button>
            <button class="button is-large" title="Export">
              <span class="icon is-large">
                <FontAwesomeIcon :icon="fas.faFileExport"/>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
</script>

<script>
export default {
  name: "navbar",
  props: {
    theme: {
      type: String,
      required: true
    },
    bookshelf: {
      type: Object,
      required: true
    },
    openContents: {
      type: Object,
      required: true
    }
  },
  computed: {
    snip: function () {
      return this.bookshelf.collections[this.openContents.collectionID]?.snips[this.openContents.snipID];
    },
    collection: function () {
      return this.bookshelf.collections[this.openContents.collectionID];
    }
  }
}
</script>

<style scoped>
.titleInput {
  background: transparent;
  border: none;
  border-bottom: var(--bulma-grey-light) thin solid;
  border-radius: 0;
  font-size: larger;
  width: 90%;
}

.titleInput:focus {
  box-shadow: 0 2px 7px -4px;
}
</style>