const {ipcRenderer} = electron;
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  const data = new FormData(form);
  let tracker = [];
  let row = [];
  isHeader = false;

  for (const entry of data) {
    if (tracker.includes(entry[0])) {
      let position = tracker.indexOf(entry[0]);
      row[position] += "&" + entry[1];
    }
    else {
      tracker.push(entry[0]);
      row.push(entry[1]);
    }
  }
  ipcRenderer.send("formData:add", row, isHeader);
}

document.body.onload = ipcRenderer.send("formQuestionsRequest", "ping");
ipcRenderer.on("formQuestionsSend", (event, arg) => {
  renderForm(arg.remotePackage);
})

function renderForm(questions) {
  for (let i = 0; i < questions.length; i++) {
    renderQuestion(questions[i]);
  }
  createButton();
}

function renderQuestion(question) {
  // create a new div element
  let newQuestion = document.createElement("div");
  newQuestion.className += "question-container";

  // and give it some content
  let questionLabel = document.createElement("label");
  questionLabel.innerHTML = question.questionName;
  newQuestion.appendChild(questionLabel);

  // Adds line break for formatting
  let lineBreak = document.createElement("br");
  newQuestion.appendChild(lineBreak);

  // renders text input
  if (question.inputType === "text"){
    let newInput = document.createElement("input");
    newInput.type = question.inputType;
    newInput.id = question.questionTag;
    newInput.name = question.questionTag;
    newQuestion.appendChild(newInput);

    newQuestion.appendChild(document.createElement("br"));
  }

  // renders radio or checkbox input
  else {
    for (let i = 0; i < question.inputValues.length; i++) {
      let newInput = document.createElement("input");
      newInput.type = question.inputType;
      newInput.id = `${question.questionTag}-${question.inputType}${i}`;
      newInput.name = question.questionTag;
      newInput.value = question.inputValues[i];

      newQuestion.appendChild(newInput);
      let newInputText = document.createTextNode(question.inputValues[i]);
      newQuestion.appendChild(newInputText);

      newQuestion.appendChild(document.createElement("br"));
    }
  }

  document.getElementById("dynamic-form").appendChild(newQuestion);
  let currentDiv = document.getElementById("form-button");
}

// Creates button for form
// do we need this or can we create the button in the html?
function createButton() {
  let newButton = document.createElement("button");
  newButton.type = "submit";
  newButton.id = "form-button";
  newButton.class = "btn";

  newButton.innerHTML = "Submit";
  document.getElementById("dynamic-form").appendChild(newButton);
}
