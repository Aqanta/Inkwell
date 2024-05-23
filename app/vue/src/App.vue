<template>
  <div :class="['is-flex is-flex-direction-row', {'theme-dark has-background-black' : darkMode}]" style="height: 100%">
    <div class="pt-2 pl-2" style="width: 17.5%">
      <Sidebar
          @themeChange="changeTheme"
      />
    </div>
    <div style="width:82.5%">
      <Snip
          :theme="darkMode ? 'dark' : 'light'"
          :id="{
            snipID: 'foo',
            collectionID: 'foo'
          }"
      />
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import Editor from "./components/editor/Editor.vue";
import Snip from "./components/editor/Snip.vue";
</script>

<script>
export default {
  data() {
    return {
      darkMode: false
    }
  },
  methods: {
    changeTheme: function ( theme ) {
      switch ( theme ) {
        case "light":
          this.darkMode = false;
          break;
        case "dark":
          this.darkMode = true;
          break;
      }
    }
  },
  mounted() {
  }
}
</script>
