"use strict"; //setting the strict mode
var formValidity=true; //global variable

//validating required fields
function validateRequired(){
  var inputElements = document.querySelectorAll(".contact input");
  var errorDiv = document.getElementById("errorText");
  errorDiv.style.color="red";
  var elementCount = inputElements.length;
  var requiredValidity = true;
  var currentElement;

  try{
    for(var i=0;i<elementCount;i++){ //validating all input elements in fieldset
      currentElement = inputElements[i];
      if(currentElement.value === ""){
        currentElement.style.background = "rgb(255,233,233)"; //if there's no input, changes the input box color to red
        requiredValidity=false;
      } else{
        currentElement.style.background="white";
      }
    }
    if(requiredValidity === false){
      throw "* Please complete all fields."; //throws the error message
    }
    errorDiv.style.display = "none";
    errorDiv.innerHTML="";
  }
  catch(msg){
    errorDiv.style.display="block";
    errorDiv.innerHTML = msg;
    formValidity = false;
  }
}


//creating event listeners for submit event
function createEventListeners(){
  var form = document.getElementsByTagName("form")[0];
  if(form.addEventListener){
    form.addEventListener("submit", validateForm, false);
  } else if (form.attachEvent){
    form.attachEvent("onsubmit", validateForm);
  }
}

//fucntion to trigger validation of required fields when the Submit button is clicked
function validateForm(evt){
  if(evt.preventDefault){
    evt.preventDefault(); //prevents from sybmitting the form
  } else{
    evt.returnValue = false; //for older browsers
  }
  formValidity = true; //reseting the value for revalidation
  validateRequired();
  validateEmail();
  if(formValidity===true){
    document.getElementsByTagName("form")[0].submit();
  }
}

//function that runs when page is loaded
if(window.addEventListener){
  window.addEventListener("load", createEventListeners, false);
} else if(window.attachEvent){
  window.attachEvent("onload", createEventListeners);
}

function validateEmail() {
	var emailInputs = document.querySelectorAll(".contact input[type=email]");
	var elementCount = emailInputs.length;
	var emailErrorDiv = document.getElementById("errorTextforEmail");
  emailErrorDiv.style.color="red";
	var emailValidity = true;
	var currentElement;

	try {

		for (var i = 0; i < elementCount; i++) {
			currentElement =  emailInputs[i];
      var newCurElem=currentElement.value;
		if (!newCurElem.match(/@/g)) {
			currentElement.style.background = "rgb(255,233,233)"; //if the input is not a number or empty, changes the box color to red
			emailValidity = false;

		} else {
			currentElement.style.background = "white";
		}
	}
		if (emailValidity === false) {
			throw "* Please, enter correct E-mail address.";//throws the error message
		}
			emailErrorDiv.style.display = "none";
			emailErrorDiv.innerHTML = "";
	}
			catch(msg){
				emailErrorDiv.style.display = "block";
				emailErrorDiv.innerHTML = msg;
				formValidity = false;
		}
	}
