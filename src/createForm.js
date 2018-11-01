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
  let headerNode = document.createTextNode("Question " + (questionsId.length));
  header.appendChild(headerNode);
  newQuestion.appendChild(header);

  // add input for name
  let nameLabel = document.createElement("label");
  let nameLabelNode = document.createTextNode("Question Name");
  nameLabel.appendChild(nameLabelNode);
  newQuestion.appendChild(nameLabel);
  newQuestion.appendChild(document.createElement("br"));

  // Add text input for name
  let newNameInput = document.createElement("input");
  newNameInput.setAttribute("type", "text");
  newNameInput.setAttribute("name", "questionName");
  newQuestion.appendChild(newNameInput);
  newQuestion.appendChild(document.createElement("br"));

  // add input for tag
  let tagLabel = document.createElement("label");
  let tagLabelNode = document.createTextNode("Question Tag");
  tagLabel.appendChild(tagLabelNode);
  newQuestion.appendChild(tagLabel);
  newQuestion.appendChild(document.createElement("br"));

  // Add text input for tag
  let newTagInput = document.createElement("input");
  newTagInput.setAttribute("type", "text");
  newTagInput.setAttribute("name", "questionTag");
  newQuestion.appendChild(newTagInput);
  newQuestion.appendChild(document.createElement("br"));

  // add label for input type
  let InputTypeLabel = document.createElement("label");
  InputTypeLabel.setAttribute("for", "inputType");
  let InputTypeNode = document.createTextNode("Input Type");
  InputTypeLabel.appendChild(InputTypeNode);
  newQuestion.appendChild(InputTypeLabel);
  newQuestion.appendChild(document.createElement("br"));

  // add radio inputs for input type
  let newInputTypeTextInput = document.createElement("input");
  newInputTypeTextInput.setAttribute("type", "radio");
  newInputTypeTextInput.setAttribute("class", "radio");
  newInputTypeTextInput.setAttribute("name", "inputType" + questionsId.length);
  newInputTypeTextInput.setAttribute("id", "text");
  newInputTypeTextInput.setAttribute("value", "text");
  newQuestion.appendChild(newInputTypeTextInput);

  let newInputTextText = document.createTextNode("Text");
  newQuestion.appendChild(newInputTextText);

  newQuestion.appendChild(document.createElement("br"));

  let newInputTypeRadioInput = document.createElement("input");
  newInputTypeRadioInput.setAttribute("type", "radio");
  newInputTypeRadioInput.setAttribute("class", "radio");
  newInputTypeRadioInput.setAttribute("name", "inputType" + questionsId.length);
  newInputTypeRadioInput.setAttribute("id", "radio");
  newInputTypeRadioInput.setAttribute("value", "radio");
  newInputTypeRadioInput.setAttribute("checked", "checked");
  newQuestion.appendChild(newInputTypeRadioInput);

  let newInputRadioText = document.createTextNode("Radio");
  newQuestion.appendChild(newInputRadioText);

  newQuestion.appendChild(document.createElement("br"));

  let newInputTypeCheckboxInput = document.createElement("input");
  newInputTypeCheckboxInput.setAttribute("type", "radio");
  newInputTypeCheckboxInput.setAttribute("class", "radio");
  newInputTypeCheckboxInput.setAttribute("name", "inputType" + questionsId.length);
  newInputTypeCheckboxInput.setAttribute("id", "checkbox");
  newInputTypeCheckboxInput.setAttribute("value", "checkbox");
  newQuestion.appendChild(newInputTypeCheckboxInput);

  let newInputCheckboxText = document.createTextNode("Checkbox");
  newQuestion.appendChild(newInputCheckboxText);

  newQuestion.appendChild(document.createElement("br"));

  /*
  <label for="input-values">Input Values (separate by comma)</label><br>
  <textarea name="input-options" id="input-options" cols="30" rows="10"></textarea>
  */

  // textarea for input values
  let inputValuesLabel = document.createElement("label");
  inputValuesLabel.setAttribute("for", "inputTalues");
  inputValuesLabel.setAttribute("id", "label-input-values");
  let inputValuesLabelNode = document.createTextNode("Input Values (separate values by comma)");
  inputValuesLabel.appendChild(inputValuesLabelNode);
  newQuestion.appendChild(inputValuesLabel);

  newQuestion.appendChild(document.createElement("br"));

  let inputValuesInput = document.createElement("textarea");
  inputValuesInput.setAttribute("name", "inputValues");
  inputValuesInput.setAttribute("id", "inputValues");
  inputValuesInput.setAttribute("cols", "30");
  inputValuesInput.setAttribute("rows", "10");
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

  let filePath = __dirname + `/../forms/` + formFile.name + '.txt';
  let fileContents = JSON.stringify(formFile);

  fs.writeFile(filePath, fileContents, (err) => {
    // throws error
    if (err) throw err;

    //success case, file saved
    console.log("form created!")
  });
}

/*
fs.writeFile(formName + '.txt', questions, (err) => {
  // throws error
  if (err) throw err;

  //success case, file saved
  console.log("form created!")
});
*/
