const { contextBridge, ipcRenderer } = require( "electron" );

// Expose protected methods from node modules
contextBridge.exposeInMainWorld( "electron", {
    send: ( channel, data ) => {
        let validChannels = [ 'save' ];
        if ( validChannels.includes( channel ) ) {
            ipcRenderer.send( channel, data );
        }
    },
    on: ( channel, func ) => {
        let validChannels = [];
        if ( validChannels.includes( channel ) ) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on( channel, ( event, ...args ) => func( ...args ) );
        }
    },
    // From render to main and back again.
    invoke: ( channel, args ) => {
        let validChannels = [ 'getData' ];
        if ( validChannels.includes( channel ) ) {
            return ipcRenderer.invoke( channel, args );
        }
    }
} )