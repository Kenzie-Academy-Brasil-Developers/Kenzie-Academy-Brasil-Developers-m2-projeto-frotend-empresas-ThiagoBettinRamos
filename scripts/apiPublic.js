const apiUrl = "http://localhost:6278"
export async function createUser(username, password, email, level){
    let body;
    if(level){
        body = {
            "username": username,
            "password":password,
            "email": email,
            "professional_level": level
        }
    }
    else{
        body = {
            "username": username,
            "password":password,
            "email": email,
        }
    }
    try{
        const requisition = await fetch(`${apiUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(requisition.ok){
            window.location.assign("../login/login.html")
        }
        /* else{
            document.body.insertAdjacentHTML("beforeend", )
        } */
    }
    catch(error){
        console.log(error)
    }
}

export async function loginUser(email, password){
    let body = {
        "email": email,   
        "password":password, 
    }
    try{
        const requisition = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(requisition.ok){
            let response = await requisition.json()
            return await response.token
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function verifyUserType(token){
    try{
        const requisition = await fetch(`${apiUrl}/auth/validate_user`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if(requisition.ok){
            let response = await requisition.json()
            return await response.is_admin
        }
        else{
            return undefined
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function listAllCompanies(){
    try{
        const requisition = await fetch(`${apiUrl}/companies`)
        const response = await requisition.json()
        return await response
    }
    catch(error){
        console.log(error)
    }
}

export async function listAllCompaniesBySector(sector){
    try{
        const requisition = await fetch(`${apiUrl}/companies/${sector}`)
        const response = await requisition.json()
        return await response
    }
    catch(error){
        console.log(error)
    }
}

export async function listAllSectors(){
    try{
        const requisition = await fetch(`${apiUrl}/sectors`)
        const response = await requisition.json()
        return await response
    }
    catch(error){
        console.log(error)
    }
}

export async function findUsersInfo(token){
    try{
        const requisition = await fetch(`${apiUrl}/users/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if(requisition.ok){
            return requisition.json()
        }
        else{
            return undefined
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function findUsersDepartment(token){
    try{
        const requisition = await fetch(`${apiUrl}/users/departments/coworkers`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if(requisition.ok){
            return requisition.json()
        }
        else{
            return undefined
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function findUsersDepartmentName(token){
    try{
        const requisition = await fetch(`${apiUrl}/users/departments`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if(requisition.ok){
            return requisition.json()
        }
        else{
            return undefined
        }
    }
    catch(error){
        console.log(error)
    }
}

