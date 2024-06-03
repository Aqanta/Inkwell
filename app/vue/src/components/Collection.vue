<template>
  <div class="mx-4 px-4 py-2">
    <h4 class="is-size-4">Snips</h4>
    <template v-for="s in snipList">
      <div
          class="is-flex is-flex-direction-row is-justify-content-space-between py-2"
          style="border-bottom: thin solid var(--bulma-border)"
      >

        <div
            class="mr-4 is-clickable is-flex-grow-1"
            @click="$emit('openSnip', {collectionID: openContents.collectionID, snipID: s.id})"
        >
          <span v-if="s.name !== ''">{{ s.name }}</span>
          <span v-else class="is-color-text-light">{{ s.placeholderName }}</span>
        </div>

        <div class="mx-4">

        </div>

        <div class="is-flex-shrink-0 ml-4 is-flex is-flex-direction-row">
          <div class="mx-2">{{ s.stats?.words ?? 0 }} words</div>
          <span class="icon has-text-link">
              <FontAwesomeIcon :icon="fas.faCog" />
          </span>
          <span class="icon has-text-danger is-clickable" @click="deleteSnip(s.id)">
              <FontAwesomeIcon :icon="fas.faTrash" />
          </span>
        </div>

      </div>
    </template>
  </div>
    <Popup
        v-if="showDeletePopup"
        title="Delete Snip"
        goColor="danger"
        goString="Delete"
        @cancel="deletePopupCancel"
        @go="deletePopupGo"
    >
      Are you sure you want to delete this snip?
    </Popup>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
</script>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: "Collection",
  components: {
    Popup: defineAsyncComponent(() => import("./core/Popup.vue"))
  },
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
  data(){
    return {
      showDeletePopup: false,
      deletePopupCancel: ()=>{},
      deletePopupGo: ()=>{}
    }
  },
  computed: {
    collection: function () {
      return this.bookshelf.collections[this.openContents.collectionID];
    },
    snipList: function () {
      return Object.keys( this.collection.snips ).map( k => this.collection.snips[k] );
    }
  },
  methods:{
    deleteSnip(snipID){
      this.deletePopupCancel = ()=>{
        this.showDeletePopup = false;
      }
      this.deletePopupGo = ()=>{
        this.$emit('deleteSnip', {collectionID: this.openContents.collectionID, snipID });
        this.showDeletePopup = false;
      }
      this.showDeletePopup = true;
    }
  }
}
</script>

<style scoped>

</style>