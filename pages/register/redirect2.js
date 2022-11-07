const buttonHome = document.getElementById("back-home")
buttonHome.addEventListener("click", (e) => {
    window.location.assign("../home/home.html")
})

const buttonLogin= document.getElementById("login-register")
buttonLogin.addEventListener("click", (e) => {
    window.location.assign("../login/login.html")
})