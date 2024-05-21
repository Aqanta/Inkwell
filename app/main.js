const { app, BrowserWindow } = require( "electron" );
const path = require( "path" );

function createWindow() {
    const win = new BrowserWindow( {
        width: 600,
        height: 920,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            sandbox: false,
            preload: path.join(__dirname, "preload.js")
        },
        autoHideMenuBar: true,
    } );

    win.loadFile( path.join( __dirname, "vue", "dist", "index.html" ) );
}

app.whenReady().then( () => {
    createWindow();

    app.on( "activate", () => {
        if ( BrowserWindow.getAllWindows().length === 0 ) {
            createWindow();
        }
    } );
} );

app.on( "window-all-closed", () => {
    if ( process.platform !== "darwin" ) {
        app.quit();
    }
} );