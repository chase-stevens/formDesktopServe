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


  document.getElementById("dynamic-form").appendChild(newQuestion);
}

  /*
  // renders text input
  if (question.inputType === "text"){
    let newInput = document.createElement("input");
    newInput.setAttribute("type", question.inputType);
    newInput.setAttribute("id", question.tag);
    newInput.setAttribute("name", question.tag);
    newQuestion.appendChild(newInput);

    let lineBreak = document.createElement("br");
    newQuestion.appendChild(lineBreak);
  }

  // renders radio or checkbox input
  else {
    for (let i = 0; i < question.inputs.length; i++) {
      let newInput = document.createElement("input");
      newInput.setAttribute("type", question.inputType);
      newInput.setAttribute("id", `${question.tag}-${question.inputType}${i}`);
      newInput.setAttribute("name", question.tag);
      newInput.setAttribute("value", question.inputs[i]);

      let newLabel = document.createElement("label");
      newLabel.setAttribute("for", `${question.tag}-${question.inputType}${i}`);


      let newInputText = document.createTextNode(question.inputs[i]);
      newLabel.appendChild(newInputText);

      newQuestion.appendChild(newInput);
      newQuestion.appendChild(newLabel);

      let lineBreak = document.createElement("br");
      newQuestion.appendChild(lineBreak);
    }
  }
}
*/
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
