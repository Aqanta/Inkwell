<template>
  <div class="pt-5 mr-4">
    <div class="is-flex is-flex-direction-row is-size-3">
      <div class="is-flex-grow-1"></div>
      <div id="toolbar" class="box is-position-sticky" style="border: none; z-index: 30;">
        <select class="ql-size mx-2">
        </select>
        <select class="ql-font mx-2">
        </select>

        <button class="ql-indent ml-2" value="-1"></button>
        <button class="ql-indent mr-2" value="+1"></button>

        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>

        <button class="ql-clean ml-2"></button>
      </div>
      <div class="is-flex-grow-1"></div>
    </div>
    <div id="editor" ref="editor" style="border: none; max-width: 100%">
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import Quill from 'quill';
import QuillMarkdown from 'quilljs-markdown';
import helperFunctions from "../helperFunctions.vue";


export default {
  name: "Editor",
  mixins: [helperFunctions],
  data() {
  },
  computed: {
  },
  methods: {},
  mounted() {
    Quill.register( 'modules/QuillMarkdown', QuillMarkdown, true );
    const quill = new Quill( '#editor', {
      modules: {
        toolbar: '#toolbar',
        QuillMarkdown: {}
      },
      placeholder: this.randomItem( ['Compose an epic...', 'Pick up a pen, start writing...', 'Unleash your imagination...', 'Once upon a time...', 'It was a dark and stormy night...'] ),
      theme: 'snow'
    } );
  }
}
</script>

<style scoped>
</style>