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
  var newQuestion = document.createElement("div");
  newQuestion.className += "question-container";

  // and give it some content
  var questionLabel = document.createElement("label");
  var questionLabelNode = document.createTextNode(question.questionName);
  questionLabel.appendChild(questionLabelNode);
  newQuestion.appendChild(questionLabel);

  // Adds line break for formatting
  var lineBreak = document.createElement("br");
  newQuestion.appendChild(lineBreak);

  // renders text input
  if (question.inputType === "text"){
    var newInput = document.createElement("input");
    newInput.setAttribute("type", question.inputType);
    newInput.setAttribute("id", question.questionTag);
    newInput.setAttribute("name", question.questionTag);
    newQuestion.appendChild(newInput);

    var lineBreak = document.createElement("br");
    newQuestion.appendChild(lineBreak);
  }

  // renders radio or checkbox input
  else {
    for (let i = 0; i < question.inputValues.length; i++) {
      var newInput = document.createElement("input");
      newInput.setAttribute("type", question.inputType);
      newInput.setAttribute("id", `${question.questionTag}-${question.inputType}${i}`);
      newInput.setAttribute("name", question.questionTag);
      newInput.setAttribute("value", question.inputValues[i]);

      var newLabel = document.createElement("label");
      newLabel.setAttribute("for", `${question.questionTag}-${question.inputType}${i}`);


      var newInputText = document.createTextNode(question.inputValues[i]);
      newLabel.appendChild(newInputText);

      newQuestion.appendChild(newInput);
      newQuestion.appendChild(newLabel);

      var lineBreak = document.createElement("br");
      newQuestion.appendChild(lineBreak);
    }
  }

  document.getElementById("dynamic-form").appendChild(newQuestion);
  var currentDiv = document.getElementById("form-button");
}

// Creates button for form
// do we need this or can we create the button in the html?
function createButton() {
  var newButton = document.createElement("button");
  newButton.setAttribute("type", "submit");
  newButton.setAttribute("id", "form-button");
  newButton.setAttribute("class", "btn");

  var newButtonText = document.createTextNode("Submit");
  newButton.appendChild(newButtonText);
  document.getElementById("dynamic-form").appendChild(newButton);
}
