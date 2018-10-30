let questions = ["placeholder"];
newQuestion();

function newQuestion() {
  // create a new div element
  let newQuestion = document.createElement("div");

  newQuestion.className += "question-" + (questions.length+1);

  // add header
  let header = document.createElement("h2");
  let headerNode = document.createTextNode("Question " + (questions.length+1));
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
  newInputTypeTextInput.setAttribute("name", "input-type");
  newInputTypeTextInput.setAttribute("id", "text");
  newInputTypeTextInput.setAttribute("value", "text");
  newQuestion.appendChild(newInputTypeTextInput);

  let newInputTextLabel = document.createElement("label")
  newInputTextLabel.setAttribute("for", "text")
  let newInputTextText = document.createTextNode("Text");
  newInputTextLabel.appendChild(newInputTextText);
  newQuestion.appendChild(newInputTextLabel);

  newQuestion.appendChild(document.createElement("br"));

  let newInputTypeRadioInput = document.createElement("input");
  newInputTypeRadioInput.setAttribute("type", "radio");
  newInputTypeRadioInput.setAttribute("name", "input-type");
  newInputTypeRadioInput.setAttribute("id", "radio");
  newInputTypeRadioInput.setAttribute("value", "radio");
  newQuestion.appendChild(newInputTypeRadioInput);

  let newInputRadioLabel = document.createElement("label")
  newInputRadioLabel.setAttribute("for", "radio")
  let newInputRadioText = document.createTextNode("Radio");
  newInputRadioLabel.appendChild(newInputRadioText);
  newQuestion.appendChild(newInputRadioLabel);

  newQuestion.appendChild(document.createElement("br"));

  let newInputTypeCheckboxInput = document.createElement("input");
  newInputTypeCheckboxInput.setAttribute("type", "radio");
  newInputTypeCheckboxInput.setAttribute("name", "input-type");
  newInputTypeCheckboxInput.setAttribute("id", "checkbox");
  newInputTypeCheckboxInput.setAttribute("value", "checkbox");
  newQuestion.appendChild(newInputTypeCheckboxInput);

  let newInputCheckboxLabel = document.createElement("label")
  newInputCheckboxLabel.setAttribute("for", "checkbox")
  let newInputCheckboxText = document.createTextNode("Checkbox");
  newInputCheckboxLabel.appendChild(newInputCheckboxText);
  newQuestion.appendChild(newInputCheckboxLabel);

  newQuestion.appendChild(document.createElement("br"));
  newQuestion.appendChild(document.createElement("hr"));

  document.getElementById("dynamic-form").appendChild(newQuestion);
}

function inputTypesTextField(questionId) {
  let question = document.getElementById(questionId);
  let elements = question.querySelectorAll("input.radio");

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("change", function(){
        if (question.querySelector("#text").checked) {
          question.querySelector("#input-options").style.display = "none";
        }
        else {
          question.querySelector("#input-options").style.display = "block";
        }
    });
  }
}
