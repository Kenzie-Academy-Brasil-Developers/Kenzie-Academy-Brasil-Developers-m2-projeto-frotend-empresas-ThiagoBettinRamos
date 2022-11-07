import { loginUser, verifyUserType} from "../../scripts/apiPublic.js";

const loginForm = document.querySelector("form")
const loginEmail = document.getElementById("user-email")
const loginPassword = document.getElementById("user-password")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let email    = loginEmail.value
    let password = loginPassword.value
    let token    = await loginUser(email, password)
    let isAdmin  = await verifyUserType(token)
    localStorage.setItem("@thiagobettin/empresas:token", JSON.stringify(token))
    if(isAdmin){
        window.location.assign("../admin-page/admin.html")
    }
    if(isAdmin === undefined){
        
    }
    if(isAdmin === false){
        window.location.assign("../user-page/user.html")
    }
})

