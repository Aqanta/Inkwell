<template>
  <div class="is-flex is-flex-direction-row" style="height: 100%;">
    <div style="width: 100%; height: 100%">
      <div class="is-flex is-flex-direction-row px-4 py-0 m-2 box">
        <div class="is-flex is-flex-direction-column is-flex-grow-1">
          <div class="pl-2 my-3">
            <input class="input is-size-3 titleInput" type="text" :placeholder="snip.placeholderName" v-model="snip.name"/>
          </div>
          <div class="pb-2">
              <span class="icon">
                  <FontAwesomeIcon :icon="fas.faCirclePlus"/>
              </span>
          </div>
        </div>
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
      <div style="height: 100%;">
        <Editor
            ref="editor"
            v-if="editorVisible"
            :theme="theme"
            @text="contents => $emit('updateSnip', openContents, contents)"
            :initialContent="delta"
        />
      </div>
    </div>
    <!--<div style="width: 20%" class="box m-2">
      <h3 class="is-size-3">Notes</h3>
    </div>-->
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import Editor from "./Editor.vue";
</script>

<script>
import { nextTick } from 'vue'

export default {
  name: "Snip",
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
      editorVisible: true
    }
  },
  computed: {
    snip() {
      return this.bookshelf.collections[this.openContents.collectionID].snips[this.openContents.snipID];
    },
    delta: function () {
      return this.snip.delta ?? undefined;
    }
  },
  methods: {
    getContents(){
      return this.$refs['editor'].getContents();
    }
  },
  watch: {
    openContents: {
      async handler( ) {
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