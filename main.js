const { app, BrowserWindow, ipcMain, } = require('electron')
const url = require('url');
const path = require('path');
const fs = require('fs');

// Declaring app windows
let mainWindow;
let addWindow;

// Declaring form questions and data
let jsonQuestions = [];
let formData = [];

// On start up
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

function createNewForm(){
  addWindow = new BrowserWindow({
    width: 800,
    height: 400,
    title: 'New Form'
  });

  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, "createForm.html"),
    protocol: 'file:',
    slashes: true
  }));
}

// Handle create add window
function createFormWindow(){
  // Create the browser window.
  addWindow = new BrowserWindow({
    width: 800,
    height: 400,
    title: 'Add Form'
  });

  // Load the index.html of the app.
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
}

// Create New Form
ipcMain.on('createNewForm', function() {
  createNewForm();
})

// Load form
ipcMain.on('loadedFormQuestion', (event, arg) => {
  if (jsonQuestions.length > 0) {
    jsonQuestions = [];
  }
  mainWindow.webContents.send('formData:clear');
  let textFormQuestions = JSON.parse(arg);
  let formData = [];
  let row = [];
  for (let i = 0; i < textFormQuestions.length; i++) {
    jsonQuestions.push(textFormQuestions[i]);
    row.push(textFormQuestions[i].tag);
  }
  mainWindow.webContents.send('formData:add', row);
  console.log(formData);
});

// Clear form
ipcMain.on('clearForm', function(){
  mainWindow.webContents.send('formData:clear');
  formData = [];
  jsonQuestions = [];
});

// Export form data as csv
ipcMain.on('exportToCSV', function(){
  let date = new Date;
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let content = nestedArrayToCSV(formData);
  let fName = year + '-' + month + "-" + day + ".csv";
  let fDir = __dirname + "/csvData/" + fName;
  fs.writeFile(fDir, content, (err) => {
    if (err) { throw err };
    console.log('The file has been saved!');
  });
});

// Logic for converting nested array to csv (how form data is stored)
function nestedArrayToCSV(nestedArray) {
  var lineArray = [];

  console.log(jsonQuestions);

  let header = []

  for (let i = 0; i < jsonQuestions.length; i++) {
    header.push(jsonQuestions[i].tag);
  }

  nestedArray.unshift(header);

  for (let i = 0; i < nestedArray.length; i++) {
    var line = nestedArray[i].join(",");
    lineArray.push(line);
  }

  var csvContent = lineArray.join("\n");
  console.log(`csv:\n${csvContent}`);
  return csvContent;
}

// Catch new window event
ipcMain.on('newForm:add', function(){
  console.log(formData);
  createFormWindow();
});

// Renders form to new window upon creation
ipcMain.on('formQuestionsRequest', (event, arg) => {
  addWindow.send("formQuestionsSend", {
    success: true,
    message: 'Loaded json',
    remotePackage: jsonQuestions
  })
})

// Adds to form data
ipcMain.on('formData:add', function(e, row){
  formData.push(row);
  console.log(formData);
  mainWindow.webContents.send('formData:add', row);
  addWindow.close();
});
