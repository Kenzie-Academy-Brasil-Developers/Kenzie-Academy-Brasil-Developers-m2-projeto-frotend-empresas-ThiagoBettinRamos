import { listAllCompanies } from "./apiPublic.js"
import { createNewDepartment } from "./apiAdmin.js";

const AllCompanies        = await listAllCompanies() 
const token = JSON.parse(localStorage.getItem("@thiagobettin/empresas:token"))

export const modalEditProfile = (user) => {
    let div = document.createElement("div")
    div.classList.add("containerModal")
    div.innerHTML = `
    <div class="containerModal ">
        <form class="editProfile">
            <button id="close"><img src="../../assets/Vector (4).png"></button>
            <h1>Editar Perfil</h1>
            <input type="text" id="user-name" placeholder="Seu nome">
            <input type="email" id="user-email" placeholder="Seu email">
            <input type="password" id="user-password" placeholder="Seu senha">
            <button id="button-edit-profile">Editar</button>
        </form>
    </div>`
    
    div.querySelector("#user-name").value     = user.username
    div.querySelector("#user-email").value    = user.email
    return div
}


export const modalDeleteDepartament = (department) => {
    let div = document.createElement("div")
    div.classList.add("containerModal")
    div.innerHTML = `
    <form class="modalDeleteDepartamento">
        <button id="close"><img src="../../assets/Vector (4).png"></button>
        <h2>Realmente deseja deletar o Departamento ${department} e demitir seus funcionários?</h2>
        <button id="button-confirme-delete-department">Confirme</button>
    </form>
    `
    return div
}

export const modalDeleteUser = (user) => {
    let div = document.createElement("div")
    div.classList.add('containerModal')
    div.innerHTML = `
    <form class="modalDeleteUser">
        <button id="close"><img src="../../assets/Vector (4).png"></button>
        <h2>Realmente deseja remover o usuário ${user}?</h2>
        <button id="button-confirme-delete-user">Deletar</button>
    </form>
    `
    return div
} 



export const modalEditUserAdmin = () => {
    let div = document.createElement('div')
    div.classList.add('containerModal')
    div.innerHTML = `
    <form class="modalEditUserAdmin">
        <button id="close"><img src="../../assets/Vector (4).png"></button>
        <h1>Editar Usuário</h1>
        <select id="edit-modalit">
            <option value="">Selecionar modalidade de trabalho </option>
            <option value="home office">Home office</option>
            <option value="presencial">Presencial</option>
            <option value="hibrido">Híbrido</option>
        </select>
        <select id="edit-level">
            <option value="">Selecionar nível profissional</option>
            <option value="estágio">Estágio</option>
            <option value="júnior">Júnior</option>
            <option value="pleno">Pleno</option>
            <option value="sênior">Sênior</option>
        </select>
        <button data-action="button-edit-profile-admin">Editar</button>
    </form>`
    return div
}


export const modalEditDepartment = () => {
let div = document.createElement("div")
div.classList.add("containerModal")
div.innerHTML = `
    <form class="modalEditDepartment">
        <button id="close"><img src="../../assets/Vector (4).png"></button>
        <h1>Editar Departamento</h1>
        <textarea id="edit-modal_description"></textarea>
        <button id="edit-modal_submit">Salvar Alterações</button>
    </form>
`;
    return div
} 

export const modalCreateDepartament = () => {
    let div = document.createElement('div')
    div.classList.add('containerModal')
    div.innerHTML = `
    <form class="modalCreateDepartament">
        <button id="close"><img src="../../assets/Vector (4).png"></button>
        <h1>Criar Departamento</h1>
        <input type="text" id="user-name" placeholder="Nome do departamento">
        <input type="text" id="user-email" placeholder="Descrição">
        <select id="user-company">
            <option value="">Selecionar empresa</option>
        </select>
        <button id="submit-department_button">Criar o departamento</button>
    </form>
    `;

    return div

}

export const modalViewDepartament = (name, description, company) => {
    let div = document.createElement('div')
    div.classList = 'containerModal'
    div.innerHTML = `
    <form class="modalViewDepartament">
        <button id="close"> <img src="../../assets/Vector (4).png"></button>
        <h2> ${name} </h2>
        <div>
            <div>
                <h3> ${description} </h3>
                <h4> ${company} </h4>
            </div>
            <div class="container">
                <div class="select-wrapper">
                    <select id="select-user">
                        <option> Selecionar usuário </option>
                    </select>
                </div>
                <button type="button" id="hire-user" class="button-green"> Contratar </button>
            </div>
        </div>
        <ul id="department-userList">
        </ul>
    </form>
    `
    return div
}





