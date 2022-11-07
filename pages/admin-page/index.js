import { authentication } from "../../scripts/aut.js";
import { listAllCompanies } from "../../scripts/apiPublic.js"
import { listUsers, listDepartments, listDepartmentsFromCompanies, createNewDepartment, editDepartment, deleteDepartment, editUserAdmin, deleteUserAdmin, getUnhiredworkers, hireUser, dismissUser } from "../../scripts/apiAdmin.js"
import { modalCreateDepartament, modalEditDepartment, modalDeleteDepartament, modalEditUserAdmin, modalDeleteUser, modalViewDepartament } from "../../scripts/modal.js"

authentication()

const token = JSON.parse(localStorage.getItem("@thiagobettin/empresas:token"))
const selectAdminEmpresas = document.getElementById("select-admin")
const AllCompanies        = await listAllCompanies() 
const departmentsUl       = document.getElementById("ul-departaments")
const logoutButton        = document.getElementById("logout-admin")
let usersArr            = await listUsers(token)
const departmentArr       = await listDepartments(token)
const createButton        = document.getElementById('create-deparment_button');

createButton.addEventListener('click', (e) => {
    document.body.insertAdjacentElement('beforeend', modalCreateDepartament())

    let inputDepartmentName           = document.getElementById('user-name')
    let inputDepartmentDescription    = document.getElementById('user-email')
    let selectDepartmentCompany       = document.getElementById('user-company')
    let submitDepartmentButton        = document.getElementById('submit-department_button')
    let closeButton                   = document.getElementById('close')

    closeButton.addEventListener("click", (subevent) => {
        subevent.preventDefault()
        document.querySelector('.containerModal').remove()
    })

    AllCompanies.forEach(company => {
        let option       = document.createElement('option')
        option.innerText = company.name
        option.value     = company.uuid
        selectDepartmentCompany.append(option)
    })

    submitDepartmentButton.addEventListener('click', async(e) => {
        e.preventDefault();
        let name = inputDepartmentName.value
        let description = inputDepartmentDescription.value
        let companyUuid = selectDepartmentCompany.value
        let response = await createNewDepartment(token, name, description, companyUuid)
        if(response === 'ok'){
            console.log('deu certo')
        }
        else {
            console.log('deu errado: ' + 'ERROR ' + response)
        }
        refreshDepartments()
        document.querySelector('.containerModal').remove()
    })
})

logoutButton.addEventListener("click", (e) =>{
    localStorage.removeItem("@thiagobettin/empresas:token")
    window.location.assign("../login/login.html")
})


AllCompanies.forEach(company => {
    const option = `
        <option value="${company.uuid}">${company.name}</option>
        `
        selectAdminEmpresas.insertAdjacentHTML("beforeend",option)
})

selectAdminEmpresas.addEventListener("change", async (e) => {
    let filteredDepartamentsArr = await listDepartmentsFromCompanies(token, selectAdminEmpresas.value)
    renderDepartmants(filteredDepartamentsArr)
})

function renderDepartmants(array){
    departmentsUl.innerHTML = ""
    array.forEach(department => {
        const departmentLi  = document.createElement('li')
        departmentLi.innerHTML = `
            <div class="info-div">
                <h2>${department.name}</h2>
                <span>${department.description}</span>
                <span>${department.companies.name}</span>
            </div>
            <div class="button-info">
                <button data-action="view-department"><img src="../../assets/eyes.png"></button>
                <button data-action="edit-department" id="edit123"><img src="../../assets/pen.png"></button>
                <button data-action="delete-department"><img src="../../assets/trash.png"></button>
            </div>
        `

        departmentsUl.insertAdjacentElement("beforeend", departmentLi)
        
        const viewButton     = departmentLi.querySelector('button[data-action="view-department"]')
        const editButton     = departmentLi.querySelector('button[data-action="edit-department"]')
        const deleteButton   = departmentLi.querySelector('button[data-action="delete-department"]')
        const departmentUuid = department.uuid

        viewButton.addEventListener("click", async(e) => {
            let id                = department.uuid
            let modal             = modalViewDepartament(department.name, department.description, department.companies.name)
            document.body.insertAdjacentElement("beforeend", modal)
            let unhiredWorkersArr = await getUnhiredworkers(token)
            let selectUser        = document.getElementById('select-user')
            let hireButton        = document.getElementById('hire-user')
            let userList          = document.getElementById('department-userList')
            let closeButton       = document.getElementById('close')

            closeButton.addEventListener("click", (subevent) => {
                subevent.preventDefault()
                document.querySelector('.containerModal').remove()
            })
            const hiredWorkers = async() => {
                let allUsers = await listUsers(token);
                return allUsers.filter(user => user.department_uuid === departmentUuid)
            }

            const unhiredWorkers = async() => {
                return getUnhiredworkers(token)
            }

            const renderUnhiredWorkers = (arr = unhiredWorkers()) => {
                selectUser.innerHTML = '<option value=""> Selecionar Usuário </option>'
                arr.forEach(worker => {
                    let option = document.createElement('option')
                    option.value = worker.uuid
                    option.innerText = worker.username
                    selectUser.append(option)
                })
            }

            const renderHiredWorkers = (arr = hiredWorkers()) => {
                userList.innerHTML = ''
                arr.forEach(worker => {
                    let li            = document.createElement('li')
                    let userName      = document.createElement('h3')
                    let userLevel     = document.createElement('h4')
                    let userCompany   = document.createElement('h4')
                    let dismissButton = document.createElement('button')

                    userName.innerText      = worker.username
                    userLevel.innerText     = worker.professional_level
                    userCompany.innerText   = department.companies.name
                    dismissButton.innerText = 'Desligar'


                    dismissButton.addEventListener('click', async(e) => {
                        e.preventDefault()
                        await dismissUser(token, worker.uuid).then( async() => {
                            renderHiredWorkers(await hiredWorkers())
                            renderUnhiredWorkers(await unhiredWorkers())
                        })

                    })
                    li.append(userName, userLevel, userCompany, dismissButton)
                    userList.append(li)
                })
            }

            renderHiredWorkers(await hiredWorkers())
            renderUnhiredWorkers(await unhiredWorkers())

            hireButton.addEventListener('click', async(e) => {
                e.preventDefault()
                let userId       = selectUser.value
                let departmentId = departmentUuid
                await hireUser(token, userId, departmentId).then( async() => {
                    renderHiredWorkers(await hiredWorkers())
                    renderUnhiredWorkers(await unhiredWorkers())
                })

            })



        })

        deleteButton.addEventListener("click", (e) => {
            let modal = modalDeleteDepartament(department.name)
            document.body.insertAdjacentElement("beforeend", modal)
            let closeButton      = document.getElementById('close')
            let deletButtonModal = document.getElementById('button-confirme-delete-department')

            closeButton.addEventListener("click", (subevent) => {
                subevent.preventDefault()
                document.querySelector('.containerModal').remove()
            })
            deletButtonModal.addEventListener("click", async (subevent) => {
                subevent.preventDefault()
                await deleteDepartment(token, departmentUuid).then(() => {
                    refreshDepartments()
                    document.querySelector('.containerModal').remove()
                 })
            })
        })

        editButton.addEventListener("click", (e) => {
            let modal = modalEditDepartment()
            document.body.insertAdjacentElement("beforeend", modal )
            let description  = document.getElementById('edit-modal_description')
            let closeButton  = document.getElementById("close")
            let submitButton = document.getElementById("edit-modal_submit")
            let textarea     = document.getElementById("edit-modal_description")
            textarea.value   = department.description
            
            closeButton.addEventListener("click", (subevent) => {
                subevent.preventDefault()
                document.querySelector('.containerModal').remove()
            })

            submitButton.addEventListener("click", async(subevent) => {
                subevent.preventDefault()
                await editDepartment(token, description.value, departmentUuid).then(() => {
                    refreshDepartments()
                    document.querySelector('.containerModal').remove()
                 })
            })
        })
    })
}
renderDepartmants(departmentArr)

function renderUsers(array){
    const userUl = document.getElementById("user-ul")
    userUl.innerHTML = ""
    array.forEach(users => {
    if(!users.is_admin){
    const userLi  = document.createElement('li')
    const userUuid = users.uuid
    userLi.innerHTML = `
                <div class="info-div">
                    <h2>${users.username}</h2>
                    <span>${users.professional_level}</span>
                    <span>${users.kind_of_work}</span>
                </div>
                <div class="button-info">
                    <button data-action="edit-user"><img src="../../assets/Vector (5).png"></button>
                    <button data-action="delete-user"><img src="../../assets/trash.png"></button>
                </div>`
        userUl.insertAdjacentElement("beforeend",userLi)

        const editButton   = userLi.querySelector('button[data-action="edit-user"]')
        const deleteButton = userLi.querySelector('button[data-action="delete-user"]')
        
        editButton.addEventListener("click", (e) => {
            let modal = modalEditUserAdmin()
            document.body.insertAdjacentElement("beforeend", modal )
            let closeButton       = document.getElementById("close")
            let editModalit       = document.getElementById("edit-modalit")
            let editLevel         = document.getElementById("edit-level")
            let editProfileAdmin  = document.querySelector('button[data-action="button-edit-profile-admin"]')
            
            editProfileAdmin.addEventListener("click", async(subevent) => {
                subevent.preventDefault()
                await editUserAdmin(token, editModalit.value, editLevel.value , userUuid).then(() => {
                    refreshUsers()
                    document.querySelector('.containerModal').remove()
                 })
            })
            
            closeButton.addEventListener("click", (subevent) => {
                subevent.preventDefault()
                document.querySelector('.containerModal').remove()
            })
        })

        deleteButton.addEventListener("click", (e) => {
            let modal = modalDeleteUser(users.username)
            document.body.insertAdjacentElement("beforeend", modal)
            let closeButton      = document.getElementById("close")
            let deleteUserButton = document.getElementById("button-confirme-delete-user")

            deleteUserButton.addEventListener("click", async (subevent) => {
                subevent.preventDefault()
                await deleteUserAdmin(token, userUuid).then(() => {
                    refreshUsers()
                    document.querySelector('.containerModal').remove()
                 })
            })

            closeButton.addEventListener("click", (subevent) => {
                subevent.preventDefault()
                document.querySelector('.containerModal').remove()
            })
        })
        }          
    })
}

renderUsers(usersArr)


async function refreshDepartments() {
    const updatedDepartmentsArr = await listDepartments(token)
    renderDepartmants(await updatedDepartmentsArr)
}

async function refreshUsers() {
    const updatedUsersArr = await listUsers(token)
    renderUsers(await updatedUsersArr)
}