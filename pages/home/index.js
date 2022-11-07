import { listAllSectors, listAllCompanies, listAllCompaniesBySector} from "../../scripts/apiPublic.js"
const sectorArr = await listAllSectors()
const selectSector = document.getElementById("select-sector")
const allCompaniesArr = await listAllCompanies()
const companiesUl = document.getElementById("ul-companies")
renderCompanies(allCompaniesArr)

//renderizar todas opções de setor
sectorArr.forEach(sector => {
    const option = document.createElement("option")
    option.value = sector.description
    option.innerText = sector.description
    selectSector.append(option)
})

//evento do select sector
selectSector.addEventListener("change",  async (e) => {
    if(e.target.value === ""){
        renderCompanies(allCompaniesArr)
    }
    else{
        let companiesArr = await listAllCompaniesBySector(e.target.value)
        renderCompanies(companiesArr)
    }
})


//redirizar empresas
function renderCompanies(array){
    companiesUl.innerHTML = ""
    array.forEach(company => {
        let li = `
        <li class="flex-column">
            <h3>${company.name}</h3>
            <label>${company.opening_hours}</label>
            <span>${company.sectors.description}</span>
        </li>
        `
        companiesUl.insertAdjacentHTML("beforeend",li)
    })

}

