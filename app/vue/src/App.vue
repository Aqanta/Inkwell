<template>
  <div class="is-flex is-flex-direction-row">
    <div class="p-2" style="width: 20%">
      <Sidebar/>
    </div>
    <div class="is-flex-grow-1">
      <Editor/>
    </div>
    <div class="p-2" style="width: 30%">
      <h4 class="is-size-4">Comments</h4>
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import Editor from "./components/editor/Editor.vue";
</script>

<script>
export default {
  data() {
  },
  methods: {},
  mounted() {
  }
}
</script>
