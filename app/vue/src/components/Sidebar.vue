<template>
  <div style="max-height: 97%" class="box">
    <div class="is-flex is-flex-direction-row is-justify-content-space-between p-1 pb-2 mb-1">
      <div class="mt-2" @click="menuOpen = !menuOpen">
        <span class="icon is-medium">
          <img src="../assets/Inkwell.svg">
        </span>
      </div>
      <div class="buttons has-addons">
        <button class="button is-light" @click="$emit('themeChange','light')">
          <span class="icon">
            <FontAwesomeIcon :icon="fas.faSun"/>
          </span>
        </button>
        <button class="button is-dark" @click="$emit('themeChange','dark')">
          <span class="icon">
            <FontAwesomeIcon :icon="fas.faMoon"/>
          </span>
        </button>
      </div>
    </div>
    <div v-if="menuOpen">
      <aside class="menu mt-1" v-if="openContents.collectionID">
        <ul class="menu-list">
          <li><a @click="$emit('addSnip', openContents.collectionID)" class="p-0" style="margin-left: -.5rem;">
            <div class="is-flex is-flex-direction-row center-fix">
              <div>
                <span class="icon">
                    <FontAwesomeIcon :icon="fas.faPlus"/>
                </span>
              </div>
              <div>Snip</div>
            </div>
          </a></li>
        </ul>
        <div class="menu-label is-flex is-flex-direction-row is-justify-content-space-between center-fix" style="margin-bottom: -.25rem;">
          <div>{{ bookshelf.collections[openContents.collectionID].name }}</div>
          <div>
          <span class="icon">
              <FontAwesomeIcon :icon="fas.faCog"/>
          </span>
          </div>
        </div>
        <ul class="menu-list">
          <li><a>Narrative</a></li>
          <li>
            <a>Snips</a>
            <ul>
              <li v-for="s in snipList">
                <a @click="$emit('changeSelection', {collectionID: openContents.collectionID, snipID: s.id})">
                  <span v-if="s.name !== ''">{{ s.name }}</span>
                  <span v-else class="is-color-text-light">{{ s.placeholderName }}</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <aside class="menu mt-1" v-else>
        <ul class="menu-list">
          <li><a @click="$emit('newCollection')" class="p-0">
            <div class="is-flex is-flex-direction-row center-fix">
              <div>
              <span class="icon">
                  <FontAwesomeIcon :icon="fas.faPlus"/>
              </span>
              </div>
              <div>Collection</div>
            </div>
          </a></li>
        </ul>
        <div class="menu-label is-flex is-flex-direction-row is-justify-content-space-between center-fix" style="margin-bottom: -.25rem;">
          <div>Collections</div>
          <div>
          <span class="icon">
              <FontAwesomeIcon :icon="fas.faCog"/>
          </span>
          </div>
        </div>
        <ul class="menu-list">
          <li v-for="c in collectionList">
            <a @click="$emit('changeSelection', {collectionID: c.id})">
              <span>{{ c.name }}</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
</script>

<script>
export default {
  name: "SideBar.vue",
  props: {
    bookshelf: {
      type: Object,
      required: true
    },
    openContents: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menuOpen: true,
    }
  },
  computed: {
    collectionList() {
      return this.bookshelf.collections;
    },
    snipList() {
      return this.bookshelf.collections[this.openContents.collectionID].snips;
    }
  },
  methods: {}
}
</script>

<style scoped>
.center-fix {
  align-items: center;
}
</style>