<template>
  <div style="max-height: 97%" class="box">
    <div v-if="menuOpen">
      <aside class="menu mt-1" v-if="openContents.collectionID">
        <ul class="menu-list">
          <li><a @click="$emit('addSnip', openContents.collectionID)" class="p-0" style="margin-left: -.5rem;">
            <div class="is-flex is-flex-direction-row">
              <div>
                <span class="icon has-text-link">
                    <FontAwesomeIcon :icon="fas.faPlus" />
                </span>
              </div>
              <div>Snip</div>
            </div>
          </a></li>
        </ul>
        <div
            class="menu-label is-flex is-flex-direction-row is-justify-content-space-between center-fix is-clickable"
            style="margin-bottom: -.25rem;"
            @click="$emit('changeSelection', {collectionID: openContents.collectionID})"
        >
          <div>{{ bookshelf.collections[openContents.collectionID].name }}</div>
          <div>
          <span class="icon has-text-link">
              <FontAwesomeIcon :icon="fas.faCog" />
          </span>
          </div>
        </div>
        <ul class="menu-list">
          <li><a>Narrative</a></li>
          <li>
            <a>Snips</a>
            <ul>
              <li v-for="s in snipList">
                <a :class="{'is-active': openContents.snipID === s.id}"
                   @click="$emit('changeSelection', {collectionID: openContents.collectionID, snipID: s.id})">
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
              <span class="icon has-text-link">
                  <FontAwesomeIcon :icon="fas.faPlus" />
              </span>
              </div>
              <div>Collection</div>
            </div>
          </a></li>
        </ul>
        <div class="menu-label is-flex is-flex-direction-row is-justify-content-space-between center-fix"
             style="margin-bottom: -.25rem;">
          <div>Collections</div>
          <div>
          <span class="icon has-text-link">
              <FontAwesomeIcon :icon="fas.faCog" />
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
import { fas } from '@fortawesome/free-solid-svg-icons';
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