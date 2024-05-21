<template>
  <div>
    <div class="is-flex is-flex-direction-row mb-1">
      <div class="is-flex-grow-1"></div>
      <img src="../assets/Inkwell.svg" style="width: 40%">
      <div class="is-flex-grow-1"></div>
    </div>
    <aside class="menu">
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

<script>
export default {
  name: "SideBar.vue"
}
</script>

<style scoped>

</style>