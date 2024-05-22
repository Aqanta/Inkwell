<template>
  <div style="height: 100%">
    <div class="is-flex is-flex-direction-row mb-1">
      <div class="is-flex-grow-1"></div>
      <img src="../assets/Inkwell.svg" style="width: 34%">
      <div class="is-flex-grow-1"></div>
    </div>
    <aside class="menu mt-1" style="box-shadow: 5px 0 2px -3px #ddd; height: 100%">
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

<style >
.ql-editor {
  font-size: 20px !important;
}
</style>