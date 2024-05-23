const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require( "electron" );
const path = require( "path" );
const fs = require( "fs" );

function createWindow() {
    const win = new BrowserWindow( {
        width: 1280,
        height: 920,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            sandbox: false,
            preload: path.join( __dirname, "preload.js" )
        },
        autoHideMenuBar: true,
        icon: path.join( __dirname, 'inkwell.ico' )
    } );

    win.loadFile( path.join( __dirname, "vue", "dist", "index.html" ) );

    win.webContents.on( 'context-menu', ( event, params ) => {
        const menu = new Menu()

        // Add each spelling suggestion
        for ( const suggestion of params.dictionarySuggestions ) {
            menu.append( new MenuItem( {
                label: suggestion,
                click: () => win.webContents.replaceMisspelling( suggestion )
            } ) )
        }

        // Allow users to add the misspelled word to the dictionary
        if ( params.misspelledWord ) {
            menu.append(
                new MenuItem( {
                    label: 'Add to dictionary',
                    click: () => win.webContents.session.addWordToSpellCheckerDictionary( params.misspelledWord )
                } )
            )
        }

        menu.popup();
    } );
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

fs.mkdir( path.join( app.getPath( 'home' ), 'Documents', 'Inkwell' ), () => {
} );

ipcMain.on( 'save', ( event, data ) => {
    //console.log( 'saving', data );
    fs.writeFile(
        path.join( app.getPath( 'home' ), 'Documents', 'Inkwell', "data.json" ),
        JSON.stringify( data, null, 2 ),
        ( err ) => {
            if ( err ) {
                console.error( err );
            }
        } );
} );

ipcMain.handle( 'getData', ( event ) => {
    if ( fs.existsSync( path.join( app.getPath( 'home' ), 'Documents', 'Inkwell', "data.json" ) ) ) {
        return JSON.parse( fs.readFileSync( path.join( app.getPath( 'home' ), 'Documents', 'Inkwell', "data.json" ) ) );
    }
} );