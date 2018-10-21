const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const url = require('url');
const path = require('path');
const fs = require('fs')

let mainWindow;
let addWindow;
let jsonQuestions = [];

app.on('ready', function(){
  // Create the browser window.
  mainWindow = new BrowserWindow({});

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow(){
  // Create the browser window.
  addWindow = new BrowserWindow({
    width: 800,
    height: 400,
    title: 'Add Form'
  });

  // and load the index.html of the app.
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
}

// load form
ipcMain.on('loadedFormQuestion', (event, arg) => {
  if (jsonQuestions.length > 0) {
    jsonQuestions = [];
  }
  let textFormQuestions = JSON.parse(arg);
  for (let i = 0; i < textFormQuestions.length; i++) {
    jsonQuestions.push(textFormQuestions[i]);
  }
})

// clear form
ipcMain.on('clearForm', function(){
  jsonQuestions = [];
});

// Catch new window event
ipcMain.on('newForm:add', function(){
  createAddWindow();
});

// renders form to new window
ipcMain.on('formQuestionsRequest', (event, arg) => {
  console.log(arg) // prints "ping"
  addWindow.send("formQuestionsSend", {
    success: true,
    message: 'Loaded json',
    remotePackage: jsonQuestions
  })
})


// Create menu template
const mainMenuTemplate = [
  {
      label: "File",
      submenu: [
        {
          label: 'Load Form',
          accelerator: process.platform == 'darwin' ? 'Command+L' : 'Ctrl+L',
          click(){
            createAddWindow();
          }
        },
        {
          label: 'Clear Form'
        },
        {
          label: 'Quit',
          accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click(){
            app.quit();
          }
        }
      ]
  }
];

// if mac, add empty object to menu
 if (process.platform == 'darwin') {
   mainMenuTemplate.unshift({});
 }

 // add developer tools item if not in prod
 if(process.env.NODE_ENV !== 'production'){
   mainMenuTemplate.push({
     label: 'Developer Tools',
     submenu:[
       {
         label: 'Toggle DevTools',
         accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
         click(item, focusedWindow){
           focusedWindow.toggleDevTools();
         }
       },
       {
          role: 'reload'
       }
     ]
   })
 }
