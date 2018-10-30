let questionsId = ["question-1"];
inputTypesTextField("question-1");

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
  InputTypeLabel.setAttribute("for", "input-type");
  let InputTypeNode = document.createTextNode("Input Type");
  InputTypeLabel.appendChild(InputTypeNode);
  newQuestion.appendChild(InputTypeLabel);
  newQuestion.appendChild(document.createElement("br"));

  // add radio inputs for input type
  let newInputTypeTextInput = document.createElement("input");
  newInputTypeTextInput.setAttribute("type", "radio");
  newInputTypeTextInput.setAttribute("class", "radio");
  newInputTypeTextInput.setAttribute("name", "input-type-" + questionsId.length);
  newInputTypeTextInput.setAttribute("id", "text");
  newInputTypeTextInput.setAttribute("value", "text");
  newQuestion.appendChild(newInputTypeTextInput);

  let newInputTextText = document.createTextNode("Text");
  newQuestion.appendChild(newInputTextText);

  newQuestion.appendChild(document.createElement("br"));

  let newInputTypeRadioInput = document.createElement("input");
  newInputTypeRadioInput.setAttribute("type", "radio");
  newInputTypeRadioInput.setAttribute("class", "radio");
  newInputTypeRadioInput.setAttribute("name", "input-type-" + questionsId.length);
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
  newInputTypeCheckboxInput.setAttribute("name", "input-type-" + questionsId.length);
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
  inputValuesLabel.setAttribute("for", "input-values");
  let inputValuesLabelNode = document.createTextNode("Input Values (separate values by comma)");
  inputValuesLabel.appendChild(inputValuesLabelNode);
  newQuestion.appendChild(inputValuesLabel);

  newQuestion.appendChild(document.createElement("br"));

  let inputValuesInput = document.createElement("textarea");
  inputValuesInput.setAttribute("name", "input-values");
  inputValuesInput.setAttribute("id", "input-values");
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
          question.querySelector("#input-values").style.display = "none";
        }
        else {
          question.querySelector("#input-values").style.display = "block";
        }
    });
  }
}
