<template>
  <div class="is-flex is-flex-direction-row">
    <div class="p-2" style="width: 20%">
      <Sidebar/>
    </div>
    <div class="is-flex-grow-1">
      <div class="is-flex is-flex-direction-row is-justify-content-space-between">
        <div></div>
        <h1 class="is-size-1 bulma-is-center">Inkwell</h1>
        <div></div>
      </div>

      <div id="editor" style="height: max-content;">
      </div>
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
</script>

<script>
import Quill from 'quill';

export default {
  data() {
  },
  methods: {},
  mounted() {
    const quill = new Quill( '#editor', {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean']                                         // remove formatting button
        ],
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    } );
  }
}
</script>
