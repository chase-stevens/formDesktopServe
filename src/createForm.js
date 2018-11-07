const fs = require('fs');
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);
let questionsId = [];

document.querySelector('#add-question').addEventListener('click', newQuestion);

function newQuestion() {
  // create a new div element
  let newQuestionName = "question-" + (questionsId.length+1);
  let newQuestion = document.createElement("div");
  questionsId.push(newQuestionName);

  newQuestion.className = newQuestionName;
  newQuestion.id = newQuestionName;

  // add header
  let header = document.createElement("h2");
  header.innerHTML = "Question " + (questionsId.length);
  newQuestion.appendChild(header);

  // add input for name
  let nameLabel = document.createElement("label");
  nameLabel.innerHTML = "Question Name";
  newQuestion.appendChild(nameLabel);

  newQuestion.appendChild(document.createElement("br"));

  // Add text input for name
  let newNameInput = document.createElement("input");
  newNameInput.type = "text";
  newNameInput.name = "questionName";
  newQuestion.appendChild(newNameInput);

  newQuestion.appendChild(document.createElement("br"));

  // add input for tag
  let tagLabel = document.createElement("label");
  tagLabel.innerHTML = "Question Tag";
  newQuestion.appendChild(tagLabel);

  newQuestion.appendChild(document.createElement("br"));

  // Add text input for tag
  let newTagInput = document.createElement("input");
  newTagInput.type = "text";
  newTagInput.name = "questionTag";
  newQuestion.appendChild(newTagInput);

  newQuestion.appendChild(document.createElement("br"));

  // add label for input type
  let inputTypeLabel = document.createElement("label");
  inputTypeLabel.htmlFor = "inputType";
  inputTypeLabel.innerHTML = "Input Type";
  newQuestion.appendChild(inputTypeLabel);

  newQuestion.appendChild(document.createElement("br"));

  // add radio inputs for input type
  let newInputTypeTextInput = document.createElement("input");
  newInputTypeTextInput.type = "radio";
  newInputTypeTextInput.className = "radio";
  newInputTypeTextInput.name = "inputType" + questionsId.length;
  newInputTypeTextInput.id = "text";
  newInputTypeTextInput.value = "text";
  newQuestion.appendChild(newInputTypeTextInput);

  let newInputTextText = document.createTextNode("Text");
  newQuestion.appendChild(newInputTextText);

  newQuestion.appendChild(document.createElement("br"));

  let newInputTypeRadioInput = document.createElement("input");
  newInputTypeRadioInput.type = "radio";
  newInputTypeRadioInput.className = "radio";
  newInputTypeRadioInput.name = "inputType" + questionsId.length;
  newInputTypeRadioInput.id = "radio";
  newInputTypeRadioInput.value = "radio";
  newInputTypeRadioInput.checked = "checked";
  newQuestion.appendChild(newInputTypeRadioInput);

  let newInputRadioText = document.createTextNode("Radio");
  newQuestion.appendChild(newInputRadioText);

  newQuestion.appendChild(document.createElement("br"));

  let newInputTypeCheckboxInput = document.createElement("input");
  newInputTypeCheckboxInput.type = "radio";
  newInputTypeCheckboxInput.className = "radio";
  newInputTypeCheckboxInput.name = "inputType" + questionsId.length;
  newInputTypeCheckboxInput.id = "checkbox";
  newInputTypeCheckboxInput.value = "checkbox";
  newQuestion.appendChild(newInputTypeCheckboxInput);

  let newInputCheckboxText = document.createTextNode("Checkbox");
  newQuestion.appendChild(newInputCheckboxText);

  newQuestion.appendChild(document.createElement("br"));

  // textarea for input values
  let inputValuesLabel = document.createElement("label");
  inputValuesLabel.htmlFor = "inputTalues";
  inputValuesLabel.id = "label-input-values";

  inputValuesLabel.innerHTML = "Input Values (separate values by comma)";
  newQuestion.appendChild(inputValuesLabel);

  newQuestion.appendChild(document.createElement("br"));

  let inputValuesInput = document.createElement("textarea");
  inputValuesInput.name = "inputValues";
  inputValuesInput.id = "inputValues";
  inputValuesInput.cols = "30";
  inputValuesInput.rows = "10";
  newQuestion.appendChild(inputValuesInput);

  newQuestion.appendChild(document.createElement("hr"));

  document.getElementById("dynamic-form").appendChild(newQuestion);
  inputTypesTextField(newQuestionName);
}

function inputTypesTextField(questionId) {
  let question = document.getElementById(questionId);
  let elements = question.querySelectorAll("input.radio");

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("change", function(){
        if (question.querySelector("#text").checked) {
          question.querySelector("#inputValues").style.display = "none";
          question.querySelector("#label-input-values").style.display = "none";
        }
        else {
          question.querySelector("#inputValues").style.display = "block";
          question.querySelector("#label-input-values").style.display = "block";
        }
    });
  }
}

function submitForm(e) {
  e.preventDefault();
  const data = new FormData(form);
  let formFile = { questions: [] };
  let newFormQuestion = {};
  let counter = 0;
  for (const entry of data) {
    if (counter === 0) {
      formFile.name = entry[1];
    } else {
      if (counter % 4 === 1) {
        newFormQuestion.questionName = entry[1];
      }
      else if (counter % 4 === 2) {
        newFormQuestion.questionTag = entry[1];
      }
      else if (counter % 4 === 3) {
        newFormQuestion.inputType = entry[1];
      }
      else if (counter % 4 === 0) {
        if (newFormQuestion.inputType !== "text") {
          newFormQuestion.inputValues = [];
          let values = entry[1].split(',');

          for (let i = 0; i < values.length; i++) {
            newFormQuestion.inputValues.push(values[i]);
          }
        }

        formFile.questions.push(newFormQuestion);
        newFormQuestion = {};

      }
    }
    counter++;
  }

  // move to main js and close window
  let filePath = __dirname + `/../forms/` + formFile.name + '.txt';
  let fileContents = JSON.stringify(formFile);

  fs.writeFile(filePath, fileContents, (err) => {
    // throws error
    if (err) throw err;

    //success case, file saved
    console.log("form created!")
  });
}
