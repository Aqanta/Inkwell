<template>
  <div :class="['pt-3 mr-4', theme === 'dark' ? 'has-text-light' : 'has-text-dark']" style="height: 100%;">
    <div class="is-flex is-flex-direction-row is-size-3">
      <div class="is-flex-grow-1"></div>
      <div id="toolbar" class="box is-position-sticky" style="border: none; z-index: 30; margin-bottom: 0;">
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
    <div id="editor" style="border: none; max-width: 100%; height: 100%">
    </div>
  </div>
</template>

<script>
import Quill from 'quill';
import QuillMarkdown from 'quilljs-markdown';
import helperFunctions from "../helperFunctions.vue";
import { shallowRef } from "vue";


export default {
  name: "Editor",
  mixins: [helperFunctions],
  props: {
    theme: {
      type: String,
      required: true
    },
    initialContent: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      newText: false,
      textTimeout: null,
      quill: undefined
    }
  },
  computed: {},
  methods: {
    sendText() {
      let contents = this.quill.getContents();
      this.$emit( 'text', contents );
      this.newText = false;
      this.textTimeout = setTimeout( () => {
        if ( this.newText ) {
          this.textTimeout = null;
          this.sendText();
        }
      }, 5000 ); //TODO make this an option
    },
    getContents() {
      return this.quill.getContents();
    }
  },
  mounted() {
    Quill.register( 'modules/QuillMarkdown', QuillMarkdown, true );
    this.quill = shallowRef( new Quill( '#editor', {
      modules: {
        toolbar: '#toolbar',
        QuillMarkdown: {}
      },
      placeholder: this.randomItem( ['Compose an epic...', 'Pick up a pen, start writing...', 'Unleash your imagination...', 'Once upon a time...', 'It was a dark and stormy night...'] ),
      theme: 'snow'
    } ) );
    if ( this.initialContent ) {
      this.quill.setContents( this.initialContent, 'silent' );
    } else {
      this.quill.setContents( [], 'silent' );
    }
    this.quill.on( 'text-change', ( delta, oldDelta, source ) => {
      if ( !this.textTimeout ) {
        this.sendText();
      } else {
        this.newText = true;
      }
    } );
  }
}
</script>

<style>
.ql-editor {
  font-size: 20px !important;
}

.theme-dark .ql-snow .ql-stroke {
  stroke: hsl(0, 0%, 96%) !important;
}

.theme-dark .ql-snow .ql-fill {
  fill: hsl(0, 0%, 96%) !important;
}

.theme-dark .ql-snow .ql-picker {
  color: hsl(0, 0%, 96%) !important;
}

.theme-dark .ql-snow strong {
  color: hsl(0, 0%, 96%) !important;
}

.ql-editor.ql-blank::before {
  color: hsl(0, 0%, 48%) !important;
}
</style>