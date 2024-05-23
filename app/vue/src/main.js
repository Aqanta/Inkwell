import { createApp } from 'vue';
import App from './App.vue';
import 'quill/dist/quill.snow.css';
import "quill/dist/quill.core.css";
import 'quilljs-markdown/dist/quilljs-markdown-common-style.css';

import { v4 as uuid } from 'uuid';

import 'bulma/css/bulma.css';

let data = {
    collections: {
        'foo': {
            snips: {
                'foo': {
                    delta: undefined,
                    name: ""
                }
            }
        }
    }
};
let app, usingElectron;

try{
    usingElectron = !!electron;
}catch ( e ){
    usingElectron = false;
}

async function setup() {
    //TODO localstorage
    let savedFile;
    if ( usingElectron ) {
        savedFile = await electron.invoke( 'getData' );
    }

    if ( savedFile ) {
        data = savedFile;
    }
    app = createApp( App );
    app.config.globalProperties.$store = {
        updateSnip: ( { snipID, collectionID }, delta ) => {
            data.collections[collectionID].snips[snipID].delta = delta;
            saveData();
        },
        newSnip( collectionID ) {
            let id = uuid();
            data.collections[collectionID].snips[id] = {
                name: '',
                id: id,
                delta: null
            }
        },
        getSnip( { snipID, collectionID } ) {
            return data.collections[collectionID].snips[snipID];
        }
    }
    app.mount( '#app' );
}

setup();


function saveData() {
    if ( usingElectron ) {
        electron.send( 'save', data );
    } else {
        //TODO use local store
    }
}