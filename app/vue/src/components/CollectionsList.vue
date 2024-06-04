<template>
  <div class="is-flex is-flex-direction-row is-flex-wrap-wrap mx-4 px-4 py-2">
    <template v-for="c in bookshelf.collections">
      <Card :cardInfo="{title: c.name, icon: c.emoji}" @contentClicked="switchCollection(c.id)"/>
    </template>
    <Card :cardInfo="{icon: 'faPlus', title:'New Collection'}" @contentClicked="showCreatePopup = true"/>
  </div>
  <Popup
      v-if="showCreatePopup"
      title="Create Collection"
      goColor="success"
      goString="Create"
      @cancel="showCreatePopup = false"
      @go="saveNewCollection"
  >
    <div class="is-flex is-flex-direction-row">
      <div>
        <div class="select">
          <select v-model="createEmoji">
            <template v-for="e in possibleEmojis">
              <option :value="e">{{ e }}</option>
            </template>
          </select>
        </div>
      </div>
      <div>
        <input class="input ml-3" type="text" placeholder="Collection Name" v-model="createName"/>
      </div>
    </div>
  </Popup>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: "Collections",
  components: {
    Card: defineAsyncComponent( () => import("./core/Card.vue") ),
    Popup: defineAsyncComponent( () => import("./core/Popup.vue") )
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
  data: () => {
    return {
      showCreatePopup: false,
      createEmoji: "📖",
      possibleEmojis: [ "📖", "📝", "📑", "📃", "📜", "📄", "✒️", "🖊️", "🖋️", "✏️", "📕", "📙", "📗", "📘", "📚", "💡", "🪶", "📓", "📔" ],
      createName: ""
    }
  },
  methods: {
    switchCollection( id ) {
      this.openContents.collectionID = id;
      this.openContents.snipID = undefined;
    },
    saveNewCollection() {
      this.$emit("newCollection", {emoji: this.createEmoji, name: this.createName});
      this.showCreatePopup = false;
    }
  }
}
</script>

<style scoped>

</style>