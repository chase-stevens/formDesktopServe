var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');

document.getElementById("load").onClick = () => {
  dialog.showOpenDialog((fileNames) => {
    if(fileNames === undefined) {
      alert("No file selected");
    }
    else {
      readFile(fileNames[0]);
    }
  });
};

function readFile(filepath) {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if(err) {
      alert(err);
      return;
    }

    console.log(data);

    //ipcRenderer.send("loadedFormQuestion", data)

  });
}
