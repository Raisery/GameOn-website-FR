function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//object to stock data from form
class Inscription {

  constructor(first, last, email, birthdate, quantity, location, conditionAccepted, wantBeContacted) {
    this.first = first;
    this.last = last;
    this.email = email;
    this.birthdate = birthdate;
    this.quantity = quantity;
    this.location = location;
    this.conditionAccepted = conditionAccepted;
    this.wantBeContacted = wantBeContacted;
    this.validate = [false, false, false, false, false, false];

    this.generateValidate();
  }

  generateValidate() {

    var nameRegex = /^[a-zA-Z]+$/g;

    //test first name
    if(this.first != "" && this.first.length >= 2 && this.first.toString().match(nameRegex) != null) {
      this.validate[0] = true;
    }

    //test last name
    if(this.last != "" && this.last.length >= 2 && this.last.toString().match(nameRegex) != null) {
      this.validate[1] = true;
    }

    //test email
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

    var testedEmail = this.email.toString().match(emailRegex);

    if(testedEmail != null) {
      if(testedEmail[0] == this.email) {
        this.validate[2] = true;
      }
    }

    //test bithdate
    if(this.birthdate != "") {
      this.validate[3] = true;
    }

    //test quantity
    var numberRegex = /\d+/g;
    if(this.quantity.toString().match(numberRegex) != null) {
      this.validate[4] = true;
    }

    //test location
    if(this.location != null) {
      this.validate[5] = true;
    }

    
  }

  //return true if the form is valid else it return false
  isValid() {
    // search the first false element in the array
    var result = this.validate.find(element => element == false);
    if(result === undefined) {
      // there is only true element
      result = true;
    }

    if(!this.conditionAccepted) {
      result = false;
    }

    return result;
  }

  //shows form validation errors 
  showErrors() {
    
    let i = 0;
    this.validate.forEach((test) => {
      if(!test) {
        errorMsg[i].style.display = "block";
      }

      else {
        errorMsg[i].style.display = "none";
      }
      i++;
    });

    if(!this.conditionAccepted) {
      errorMsg[i].style.display = "block";
    }
    else {
      errorMsg[i].style.display = "none";
    }
  }
}

// DOM Elements
const modalbg = document.querySelector(".form-window");
const modalClose = document.querySelectorAll(".close-btn");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.querySelector(".btn-submit");
const errorMsg = document.querySelectorAll(".error-msg");
const modalValidate = document.querySelector(".validate");
const formReset = document.querySelector("form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

// submit button event
submitBtn.addEventListener("click", function(event) {
    testFormValidity(event);
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  modalValidate.style.display = "none";
}

//form verification
function testFormValidity(event) {
  
  var dataForm = document.querySelectorAll(".text-control");
  var radioBtn = document.querySelectorAll("input[type = 'radio']");
  var checkBoxs = document.querySelectorAll("input[type = 'checkbox']");
  var location = null;

  radioBtn.forEach((loc) => {
    
    if(loc.checked) {
      location = loc.value;
    }
   
  })
  var inscription = new Inscription(
    dataForm[0].value,
    dataForm[1].value,
    dataForm[2].value,
    dataForm[3].value,
    dataForm[4].value,
    location,
    checkBoxs[0].checked,
    checkBoxs[1].checked);
  
  if(inscription.isValid()) {
    modalbg.style.display= 'none';
    modalValidate.style.display="block";
    formReset.reset();
  }
  else {
    
    inscription.showErrors();
  }
  event.stopPropagation();
  event.preventDefault();
  
}


