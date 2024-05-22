<template>
  <div class="is-flex is-flex-direction-row p-4 pl-0 mt-1" style="box-shadow: 0 5px 2px -3px #ddd">
    <div class="is-flex-grow-1">
      <input class="input is-size-3 titleInput" type="text" placeholder="Snip"/>
    </div>
    <div class="buttons has-addons mb-0 mx-4">
      <button class="button is-large" title="Add Tag">
        <span class="icon is-large">
          <FontAwesomeIcon :icon="fas.faCirclePlus"/>
        </span>
      </button>
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
  <div class="is-flex is-flex-direction-row">
    <div style="width: 80%">
      <Editor/>
    </div>
    <div style="width: 20%" >

    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import Editor from "./Editor.vue";
</script>

<script>


export default {
  name: "Snip"
}
</script>

<style scoped>
.titleInput {
  border: none;
  text-overflow: ellipsis;
  box-shadow: none;
  line-height: 3rem;
  padding: 0;
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