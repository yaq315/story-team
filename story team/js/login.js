const Email = document.getElementById("Email");
const pass = document.getElementById("Password");
const emailerror = document.getElementById("Eerror");
const passerrorror = document.getElementById("Perror");
const btnlogin = document.getElementById("btnl");

btnlogin.addEventListener("click",( event)=>{
let valid = true;

event.preventDefault();

emailerror.style.display = "none";
emailerror.textContent = "";


passerrorror.style.display = "none";
passerrorror.textContent = "";

if ( Email.value.trim() === ""){
    Email.classList.add("border", "border-danger" , "border-2");
     valid = false;
}else if (!Email.value.match(/^[^\s@]+@[^\s@]+.[^\s@]+$/)){
    emailerror.style.display = "block";
    emailerror.textContent = "Please enter a valid email!";
    valid = false;
}

if ( pass.value.trim() === ""){
    pass.classList.add("border", "border-danger" , "border-2");
     valid = false;
}else if (pass.value.length<8){
    passerrorror.style.display = "block";
    passerrorror.textContent = "Please enter a valid password!";
    valid = false;
}


if (valid){
const username = Email.value.split("@")[0];
localStorage.setItem("username", username);
sessionStorage.setItem("Password", Password);


window.location.href = "dashboard.html";

}
})


Email.addEventListener("input" , ()=>{
    Eerror.classList.remove("border-danger");
    Eerror.classList.add("border-success");
})



pass.addEventListener("input" , ()=>{
    Perror.classList.remove("border-danger");
    Perror.classList.add("border-success");
})
