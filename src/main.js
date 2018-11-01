const { app, BrowserWindow, ipcMain, } = require('electron')
const url = require('url');
const path = require('path');
const fs = require('fs');

// Declaring app windows
let mainWindow; // Main Menu
let addWindow; // Additional Windows for creating and serving forms

// Declaring form questions and data
let jsonQuestions = []; // form-questions.js
let formData = []; // form-responses.js

// On start up
app.on('ready', function(){
  // Create the browser window.
  mainWindow = new BrowserWindow({});

  // Load index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../public/index.html'),
    protocol: 'file:',
    slashes: true
  }));
});

// Creates a new window to create a form
function createForm(){
  addWindow = new BrowserWindow({
    width: 800,
    height: 400,
    title: 'New Form'
  });

  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, "../public/createForm.html"),
    protocol: 'file:',
    slashes: true
  }));
}

// Creates a new window to serve form
function serveForm(){
  // Create the browser window.
  addWindow = new BrowserWindow({
    width: 800,
    height: 400,
    title: 'Serve Form' // TODO: pass in form name as title
  });

  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../public/serveForm.html'),
    protocol: 'file:',
    slashes: true
  }));
}

// Load form from JSON object to app
ipcMain.on('loadedFormQuestion', (event, arg) => {
  if (jsonQuestions.length > 0) {
    jsonQuestions = [];
  }
  mainWindow.webContents.send('formData:clear');
  let textFormQuestions = JSON.parse(arg);
  let formData = [];
  let row = [];
  for (let i = 0; i < textFormQuestions.questions.length; i++) {
    jsonQuestions.push(textFormQuestions.questions[i]);
    row.push(textFormQuestions.questions[i].questionTag);
  }
  mainWindow.webContents.send('formData:add', row);
});

// Create New Form
ipcMain.on('createForm', function() {
  createForm();
})

// Serves Form
ipcMain.on('newForm:add', function(){
  serveForm();
});

// Renders served form to new window upon creation
ipcMain.on('formQuestionsRequest', (event, arg) => {
  addWindow.send("formQuestionsSend", {
    success: true,
    message: 'Loaded json',
    remotePackage: jsonQuestions
  })
})

// Takes served form data and adds to app form data
ipcMain.on('formData:add', function(e, row){
  formData.push(row);
  mainWindow.webContents.send('formData:add', row);
  addWindow.close();
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
  let fDir = __dirname + "/../csvData/" + fName;
  fs.writeFile(fDir, content, (err) => {
    if (err) { throw err };
    console.log('The file has been saved!');
  });
});

// Logic for converting nested array to csv (how form data is stored)
function nestedArrayToCSV(nestedArray) {
  let lineArray = [];
  let header = []

  for (let i = 0; i < jsonQuestions.length; i++) {
    header.push(jsonQuestions[i].questionTag);
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
