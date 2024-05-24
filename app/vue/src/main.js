import { createApp, ref } from 'vue';
import App from './App.vue';
import 'quill/dist/quill.snow.css';
import "quill/dist/quill.core.css";
import 'quilljs-markdown/dist/quilljs-markdown-common-style.css';
import 'bulma/css/bulma.css';

let app;

app = createApp( App );
app.mount( '#app' );
