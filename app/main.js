const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require( "electron" );
const path = require( "path" );
const fs = require( "fs" );
const fsp = require( 'fs/promises' );

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
fs.mkdir( path.join( app.getPath( 'userData' ), 'bookshelf' ), () => {
} );

ipcMain.on( 'saveCollection', async ( event, { collectionID, collection } ) => {
    await makeDirectory( 'bookshelf', collectionID );
    fs.writeFile(
        path.join( app.getPath( 'userData' ), 'bookshelf', collectionID, 'collection.json' ),
        JSON.stringify( collection, null, 2 ),
        ( err ) => {
            if ( err ) {
                console.error( err );
            }
        } );
} );

let snipsToEdit = {};
let snipSaveCallback = null;
ipcMain.on( 'saveSnip', async ( event, { collectionID, snipID, snip } ) => {
    await makeDirectory( 'bookshelf', collectionID, snipID );
    snipsToEdit[`${collectionID}:${snipID}`] = {
        collectionID,
        snipID,
        snip,
        timestamp: new Date()
    }

    if ( snipSaveCallback == null ) {
        saveSnip();
    }
    //TODO - keep track of history
} );

function saveSnip() {
    let { collectionID, snipID, snip, timestamp } = Object.values( snipsToEdit )[0];
    fs.writeFile(
        path.join( app.getPath( 'userData' ), 'bookshelf', collectionID, snipID, 'snip.json' ),
        JSON.stringify( snip, null, 2 ),
        ( err ) => {
            if ( err ) {
                console.error( err );
            }

            if ( timestamp === snipsToEdit[`${collectionID}:${snipID}`].timestamp ) {
                delete snipsToEdit[`${collectionID}:${snipID}`];
            }

            if ( Object.keys( snipsToEdit ).length > 0 ) {
                snipSaveCallback = setTimeout( saveSnip, 4000 );
            } else {
                snipSaveCallback = null;
            }
        } );
}

ipcMain.on( 'deleteCollection', async ( event, { collectionID } ) => {
    fs.rmSync( path.join( app.getPath( 'userData' ), 'bookshelf', collectionID ), {
        recursive: true,
        force: true
    } );
} );
ipcMain.on( 'deleteSnip', async ( event, { collectionID, snipID } ) => {
    fs.rmSync( path.join( app.getPath( 'userData' ), 'bookshelf', collectionID, snipID ), {
        recursive: true,
        force: true
    } );
} );

ipcMain.handle( 'getData', async ( event ) => {
    return await loadData();
} );

async function loadData() {
    const rootPath = path.join( app.getPath( 'userData' ), 'bookshelf' );
    await makeDirectory( 'bookshelf' );
    const folders = await asyncFilter( await fsp.readdir( rootPath ), async file => (await fsp.stat( path.join( rootPath, file ) )).isDirectory() );
    const collections = (await Promise.all( folders.map( async folder => {
        const files = await fsp.readdir( path.join( rootPath, folder ) );
        if ( files.includes( 'collection.json' ) ) {
            const snipFolders = await asyncFilter( await fsp.readdir( path.join( rootPath, folder ) ), async file => (await fsp.stat( path.join( rootPath, folder, file ) )).isDirectory() );
            return {
                ...JSON.parse( await fsp.readFile( path.join( rootPath, folder, 'collection.json' ) ) ),
                snipsArr: await Promise.all( snipFolders.map( async sFolder => JSON.parse( await fsp.readFile( path.join( rootPath, folder, sFolder, 'snip.json' ) ) ) ) )
            };
        }
        return undefined
    } ) )).reduce( ( acc, val ) => {
        val.snips = val.snipsArr.reduce( ( acc, val ) => {
            acc[val.id] = val;
            return acc;
        }, {} );
        delete val.snipsArr;
        acc[val.id] = val;
        return acc;
    }, {} );

    return {
        collections
    }
}

const asyncFilter = async ( arr, predicate ) => {
    const results = await Promise.all( arr.map( predicate ) );
    return arr.filter( ( _v, index ) => results[index] );
}

function makeDirectory( ...pathItems ) {
    return new Promise( resolve => {
        if ( !fs.existsSync( path.join( app.getPath( 'userData' ), ...pathItems ) ) ) {
            fs.mkdir( path.join( app.getPath( 'userData' ), ...pathItems ), () => {
                resolve();
            } );
        } else {
            resolve();
        }
    } )
}