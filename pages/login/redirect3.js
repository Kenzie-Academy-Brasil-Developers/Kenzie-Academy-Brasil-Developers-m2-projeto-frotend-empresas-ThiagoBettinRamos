const buttonHome = document.getElementById("back-home-login")
buttonHome.addEventListener("click", (e) => {
    window.location.assign("../home/home.html")
})

const buttonRegister = document.getElementById("back-register")
buttonRegister.addEventListener("click", (e) => {
    window.location.assign("../register/register.html")
})

const buttonBackRegister = document.getElementById("register-login")
buttonBackRegister.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.assign("../register/register.html")
})