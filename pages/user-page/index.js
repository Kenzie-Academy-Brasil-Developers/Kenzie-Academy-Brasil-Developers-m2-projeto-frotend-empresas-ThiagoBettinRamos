import { authentication } from "../../scripts/aut.js";
import { editUser } from "../../scripts/apiAdmin.js";
import { modalEditProfile } from "../../scripts/modal.js"
import { findUsersInfo, findUsersDepartment, findUsersDepartmentName } from "../../scripts/apiPublic.js"
authentication()

const token = JSON.parse(localStorage.getItem("@thiagobettin/empresas:token"))
const userInfo            = await findUsersInfo(token)
const editProfileButton   = document.getElementById("edit-info-user")
const logoutButton        = document.getElementById("logout")

logoutButton.addEventListener("click", (e) =>{
    localStorage.removeItem("@thiagobettin/empresas:token")
    window.location.assign("../login/login.html")
})

        
    editProfileButton.addEventListener("click", (e) => {
        let modal = modalEditProfile(userInfo)
        document.body.insertAdjacentElement("beforeend", modal )
        let closeButton       = document.getElementById("close")
        let editNameUser      = document.getElementById("user-name")
        let editEmailUser     = document.getElementById("user-email")
        let editPasswordUser  = document.getElementById("user-email")
        let editProfileAdmin  = document.getElementById("button-edit-profile")
            
        editProfileAdmin.addEventListener("click", async (subevent) => {
            subevent.preventDefault()
            await editUser(token, editNameUser.value, editEmailUser.value , editPasswordUser.value).then(() => {
                refreshInfos()
                document.querySelector('.containerModal').remove()
            })
        })
            
        closeButton.addEventListener("click", (subevent) => {
            subevent.preventDefault()
            document.querySelector('.containerModal').remove()
        })
    })

function renderProfileInfos(user){
    const div = document.querySelector(".info-label")
    div.innerHTML = `
    <div>
        <h1>${user.username}</h1>
    </div>
    <div class="label-info-text">
        <label>${user.email}</label>
        <label>${user.professional_level}</label>
        <label>${user.kind_of_work}</label>
    </div>
    `
}
renderProfileInfos(userInfo)

async function renderAllFriends(){
    const userCompany = await findUsersDepartmentName(token)

    const companyInfo = document.getElementById('company-info')
    if(userCompany.length === 0) {
        companyInfo.innerHTML = '<span> Você ainda não foi contratado </span>'
    }
    else {
        await findUsersDepartment(token)
        .then((response) => {

            const header = `
            <div class="header-box-container">
                <h2> ${userCompany.name} - ${response[0].name}</h2>
            </div>
            `
            const ul = document.createElement('ul')
            ul.classList = 'list-container'

            response[0].users.forEach(user => {
                let li = `
                <li>
                    <h3> ${user.username} </h3>
                    <span> ${user.professional_level} </span>
                </li>
                `
                ul.insertAdjacentHTML('beforeend', li)
            })

            companyInfo.insertAdjacentHTML('afterbegin', header)
            companyInfo.append(ul)
        })
    }

  /*   const nav     = document.querySelector(".nav-container")
    nav.innerHTML = `
        <div class="header-box-container">
            <h2>${name} - ${description}</h2>
        </div>
    ` */

}

renderAllFriends()

async function refreshInfos() {
    const updatedInfo = await findUsersInfo(token)
    renderProfileInfos(await updatedInfo)
    console.log(updatedInfo)
}

