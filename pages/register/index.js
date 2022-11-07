import { createUser } from "../../scripts/apiPublic.js";

const registerForm = document.querySelector("form")
const registerName = document.getElementById("user-name")
const registerEmail = document.getElementById("user-email")
const registerPassword = document.getElementById("user-password")
const registerLevel = document.getElementById("user-level")


registerForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    let username = registerName.value
    let password = registerPassword.value
    let email    = registerEmail.value
    let level = registerLevel.value
    console.log(level)
    if(registerLevel.value !== ""){
        createUser(username, password, email, level)
    }
    else{
        createUser(username, password, email)
    }
})


