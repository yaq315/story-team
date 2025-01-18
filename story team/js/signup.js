let FirstN = document.getElementById("FirstN");
let LastN = document.getElementById("LastN");
let Email = document.getElementById("email");
let pass = document.getElementById("pass");
let confirm = document.getElementById("confirm");
let btnsign = document.getElementById("btns");
let errorspan = document.getElementById("merror");
let errprpass = document.getElementById("Error");
let errorconfirm = document.getElementById("ercc");
const errorfirst = document.getElementById("ferror");
const errorlast= document.getElementById("lerror");
const arr = [];

btnsign.addEventListener("click", (event) => {

let valid = true;

event.preventDefault();

errorspan.style.display = "none";
errorspan.textContent = "";

errprpass.style.display = "none";
errprpass.textContent = "";

errorconfirm.style.display = "none";
errorconfirm.textContent = "";

    errorfirst.style.display= "none";
    errorfirst.textContent= "";

    errorlast.style.display= "none";
    errorlast.textContent= "";

  

if (FirstN.value.trim()=== ""){
FirstN.classList.add("border" , "border-danger" , "border-2");
valid = false;
}else if(!FirstN.value.match(/[a-zA-Z]/)){
    errorfirst.style.display="block";
    errorfirst.textContent="Please enter letters only";
    isvalied = false;}

if (LastN.value.trim() === ""){
    LastN.classList.add("border" , "border-danger", "border-2");
    valid = false;
}else if(!LastN.value.match(/[a-zA-Z]/)){
    errorlast.style.display="block";
    errorlast.textContent="Please enter letters only";
    isvalied = false;}

//story- emil
if ( Email.value.trim() === ""){
    Email.classList.add("border", "border-danger" , "border-2");
     valid = false;
}else if (!Email.value.match(/^[^\s@]+@[^\s@]+.[^\s@]+$/)){
    errorspan.style.display = "block";
    errorspan.textContent = "Please enter a valid Email address!";
    valid = false;
}


// story-pass
if ( pass.value.trim() === ""){
    pass.classList.add("border", "border-danger" , "border-2");
     valid = false;
}else if (pass.value.length<8){
    errprpass.style.display = "block";
    errprpass.textContent = "password be ar least 8 character!";
     valid = false;
}

if ( confirm.value.trim()===""){
    confirm.classList.add("border", "border-danger", "border-2")
    valid= false;
}else if (confirm.value !== pass.value){
    errorconfirm.style.display = "block";
    errorconfirm.textContent = "password dont match";
    valid = false;    
}

// if ( valid === false){}
// else {}

// });

FirstN.addEventListener("input" , ()=>{
    FirstN.classList.remove("border-danger");
    FirstN.classList.add("border-success");
})

LastN.addEventListener("input" , ()=>{
    LastN.classList.remove("border-danger");
    LastN.classList.add("border-success");
})
Email.addEventListener("input" , () => {
    Email.classList.remove("border-danger");
    Email.classList.add("border-success")
})

pass.addEventListener("input" , () => {
pass.classList.remove("border-danger");
pass.classList.add ("border-success")

})

confirm.addEventListener("input", () => {
    confirm.classList.remove("border-danger");
    confirm.classList.add("border-success");
})
let fname = FirstN.value;
let lname = LastN.value;
let email = Email.value;
let password = pass.value;
let cPassword = confirm .value;
if (valid == true) {
    let userInfo = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      cPassword: cPassword,
    };

    console.log(userInfo);
    arr.push(userInfo);
    console.log(arr);

    localStorage.setItem("fullUserInfo", JSON.stringify(arr));

    let data = localStorage.getItem("fullUserInfo");
    console.log(data);
    
    window.location.href = "login.html";
  }
});




