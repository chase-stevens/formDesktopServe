const { app, BrowserWindow, ipcMain, } = require('electron')
const url = require('url');
const path = require('path');
const fs = require('fs')

let mainWindow;
let addWindow;
let jsonQuestions = [];
let formData = []

app.on('ready', function(){
  // Create the browser window.
  mainWindow = new BrowserWindow({});

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
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
  let formData = [];
  let row = [];
  mainWindow.webContents.send('formData:clear');
  for (let i = 0; i < textFormQuestions.length; i++) {
    jsonQuestions.push(textFormQuestions[i]);
    row.push(textFormQuestions[i].tag);
  }
  formData.push(row);
  mainWindow.webContents.send('formData:add', row);
})

// clear form
ipcMain.on('clearForm', function(){
  formData = [];
  mainWindow.webContents.send('formData:clear');
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

// adds to form data
ipcMain.on('formData:add', function(e, row){
  formData.push(row)
  console.log(formData);
  mainWindow.webContents.send('formData:add', row);
  addWindow.close();
});
