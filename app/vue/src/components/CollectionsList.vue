<template>
  <div class="is-flex is-flex-direction-row is-flex-wrap-wrap mx-4 px-4 py-2">
    <template v-for="c in bookshelf.collections">
      <Card :cardInfo="{title: c.name, icon: c.emoji}" @contentClicked="switchCollection(c.id)"/>
    </template>
    <Card :cardInfo="{icon: 'faPlus', title:'New Collection'}"/>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
  name: "Collections",
  components:{
    Card: defineAsyncComponent(() => import("./core/Card.vue")),
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
  methods: {
    switchCollection( id ) {
      this.openContents.collectionID = id;
      this.openContents.snipID = undefined;
    }
  }
}
</script>

<style scoped>

</style>