
let question0 = document.getElementById("question-input-0");
let elements = question0.querySelectorAll("input.radio");

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("change", function(){
      if (question0.querySelector("#text").checked) {
        question0.querySelector("#input-options").style.display = "none";
      }
      else {
        question0.querySelector("#input-options").style.display = "block";
      }
  });
}

/*
inputType0.addEventListener("change" ,function(){
  console.log("flipped the switch");
  inputType0.checked ? inputValues0_Display = "none" : inputValues0_Display = "block";
})
*/
