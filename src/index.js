document.querySelector('#create').addEventListener('click', createForm)
document.querySelector('#load').addEventListener('click', openFile)
document.querySelector('#serve').addEventListener('click', formRender)
document.querySelector('#save').addEventListener('click', exportToCSV)
document.querySelector('#clear').addEventListener('click', clearForm)


// Stores whether form is loaded
let isLoaded = false;

// Renders form headers to UI
ipcRenderer.on('formData:add', function(e, row, isHeader){
  const formTable = document.getElementById("form-data-table")
  const tableRow = document.createElement('tr');

  // need to split so headers are th and data is td
  for (let entry of row) {
    let tableCell = document.createElement(isHeader ? 'th' : 'td');
    tableCell.innerHTML = entry;
    tableRow.appendChild(tableCell);
  }

  formTable.appendChild(tableRow);
});

// Sends a request to create a new form
function createForm() {
  ipcRenderer.send('createForm');
}

// Sends a request for a new form fill-out
function formRender(){
  ipcRenderer.send('newForm:add');
}


// Removes data from UI
ipcRenderer.on("formData:clear", function() {
  document.getElementById("form-data-table").innerHTML = "";
});

// Sends request to export data to csv
function exportToCSV(){
  ipcRenderer.send('exportToCSV');
}

// Clears form
function clearForm(){
  if (isLoaded) {
    ipcRenderer.send('clearForm');
    alert("Form cleared!")
    isLoaded = false;
    document.getElementById("form-loaded").innerHTML = `No Form Loaded`;
  }
  else {
    alert("No form loaded!")
  }
}

// Opens file from computer
function openFile() {
  dialog.showOpenDialog((fileNames) => {
    if(fileNames === undefined) {
      alert("No file selected");
    }
    else {
      readFile(fileNames[0]);
    }
  });
};

// Loads form from file
function readFile(filepath) {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if(err) {
      alert(err);
      return;
    }

    ipcRenderer.send("loadedFormQuestion", data);
    isLoaded = true;
    myRegex = /[^/]+$/;
    name = myRegex.exec(filepath);
    document.getElementById("form-loaded").innerHTML = `Form: ${name}`;
  });
}
