<template>
  <div class="is-flex is-flex-direction-row" style="height: 100%;">
    <div style="width: 100%; height: 100%">
      <div style="height: 100%;">
        <Editor
            ref="editor"
            v-if="editorVisible"
            :theme="theme"
            @text="contents => $emit('updateSnip', openContents, contents)"
            :snip="snip"
        />
      </div>
    </div>
    <!--<div style="width: 20%" class="box m-2">
      <h3 class="is-size-3">Notes</h3>
    </div>-->
    <!--Tags-->
  </div>
</template>

<script>
import { nextTick, defineAsyncComponent } from 'vue';
export default {
  name: "Snip",
  components: {
    Editor: defineAsyncComponent( () => import("./Editor.vue") )
  },
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
  data() {
    return {
      editorVisible: true,
      fas
    }
  },
  computed: {
    snip() {
      return this.bookshelf.collections[this.openContents.collectionID].snips[this.openContents.snipID];
    }
  },
  methods: {
    getContents() {
      return this.$refs['editor'].getContents();
    }
  },
  watch: {
    openContents: {
      async handler() {
        this.editorVisible = false;
        await nextTick();
        this.editorVisible = true;
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.titleInput {
  border: none;
  text-overflow: ellipsis;
  box-shadow: none;
  line-height: 3rem;
  height: 2.75rem;
  padding: 0;
}

.titleInput:focus {
  box-shadow: none;
}

.square {
  width: 5rem;
  height: 5.5rem;
  color: #222222;
  border-left: #1f2229 thin solid;
  border-right: #1f2229 thin solid;
  place-items: center;
}

.square:hover {
  color: #444444;
}
</style>