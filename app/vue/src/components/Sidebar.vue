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
    <aside class="menu mt-1" v-if="menuOpen">
      <ul class="menu-list">
        <li><a>New Snip</a></li>
        <li><a>Collections</a>
          <ul>
            <li><a>Narrative</a></li>
            <li>
              <a class="is-active">Snips</a>
              <ul>
                <li><a>It began...</a></li>
                <li><a>New</a></li>
              </ul>
            </li>
            <li><a>Setting</a></li>
            <li><a>Plot</a></li>
            <li><a>Characters</a></li>
          </ul>
        </li>
        <li><a>Settings</a></li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
</script>

<script>
export default {
  name: "SideBar.vue",
  data() {
    return {
      menuOpen: true
    }
  },
}
</script>

<style>

</style>