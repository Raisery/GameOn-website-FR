function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//object to stock data of form
class Inscription {

  constructor(first, last, email, birthdate, quantity, location) {
    this.first = first;
    this.last = last;
    this.email = email;
    this.birthdate = birthdate;
    this.quantity = quantity;
    this.location = location;
    this.conditionAccepted = true;
    this.validate = [false, false, false, false, false, false];
  }

  verification() {
    this.validate = [false, false, false, false, false, false];

    //test first name
    if(this.first != "" && this.first.length >= 2) {
      this.validate[0] = true;
    }

    //test last name
    if(this.last != "" && this.last.length >= 2) {
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

    //logs
    console.log(this.validate[0]," : ",this.first);
    console.log(this.validate[1]," : ",this.last);
    console.log(this.validate[2]," : ",this.email);
    console.log(this.validate[3]," : ",this.birthdate);
    console.log(this.validate[4]," : ",this.quantity);
    console.log(this.validate[5]," : ",this.location);

    
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalClose = document.querySelectorAll(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.querySelector(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

// submit button event
submitBtn.addEventListener("click", function(event) {
  event.stopPropagation();
  event.preventDefault();

  testFormValidity();
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//verification of form
function testFormValidity() {
  
  var dataForm = document.querySelectorAll(".text-control");
  var checkBoxs = document.querySelectorAll("input[type = 'radio']");
  var location = null;
  checkBoxs.forEach((loc) => {
    
    if(loc.checked) {
      console.log("V ",loc.value);
      location = loc.value;
    }
    else {
      console.log("X ",loc.value);
    }
  })
  var inscription = new Inscription(dataForm[0].value,dataForm[1].value,dataForm[2].value,dataForm[3].value,dataForm[4].value,location);


  inscription.verification();
  
}

