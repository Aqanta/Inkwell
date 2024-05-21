<template>
  <div id="editor" style="min-height: 15rem">
  </div>
</template>

<script>
import Quill from 'quill';

export default {
  name: "Editor",
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

<style scoped>

</style>