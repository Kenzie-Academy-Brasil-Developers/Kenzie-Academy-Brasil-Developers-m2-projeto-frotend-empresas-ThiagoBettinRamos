const apiUrl = "http://localhost:6278"

export async function listUsers(token){
    try{
        const requisition = await fetch(`${apiUrl}/users`, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
        })
        if(requisition.ok){
            let response = await requisition.json()
            return await response
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function listDepartments(token){
    try{
        const requisition = await fetch(`${apiUrl}/departments`, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
        })
        if(requisition.ok){
            let response = await requisition.json()
            return await response
        }
    }
    catch(error){
        console.log(error)
    }
}



export async function listDepartmentsFromCompanies(token, uuid){
    try{
        const requisition = await fetch(`${apiUrl}/departments/${uuid}`, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
        })
        if(requisition.ok){
            let response = await requisition.json()
            return await response
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function createNewDepartment(token, name, description, companyUuid) {
    let body = {
        "name": name,
        "description": description,
        "company_uuid": companyUuid
    }

    try{
        const requisition = await fetch(`${apiUrl}/departments`, {
            method: "POST",
            headers: {
                "Content-Type"  : `application/json`,
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if(requisition.ok){
            let response = await requisition.json()
            return 'ok'
        }
        else {
            return requisition.status
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function editDepartment(token, description, departmentUuid) {
    let body = {
        "description": description,
    }

    try{
        const requisition = await fetch(`${apiUrl}/departments/${departmentUuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type"  : `application/json`,
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if(requisition.ok){
            let response = await requisition.json()
            return 'ok'
        }
        else {
            return requisition.status
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function deleteDepartment(token, departmentUuid) {
    try{
        const requisition = await fetch(`${apiUrl}/departments/${departmentUuid}`, {
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
        })

        if(requisition.ok){
            let response = await requisition.json()
            return 'ok'
        }
        else {
            return requisition.status
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function editUserAdmin(token, kindOfWork, professionalLevel, userUuid) {
    let body = {
        "kind_of_work": kindOfWork,
	    "professional_level": professionalLevel
    }

    try{
        const requisition = await fetch(`${apiUrl}/admin/update_user/${userUuid}`, {
            method: "PATCH",
            headers: {
                "Content-Type"  : `application/json`,
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if(requisition.ok){
            let response = await requisition.json()
            return 'ok'
        }
        else {
            return requisition.status
        }
    }
    catch(error){
        console.log(error)
    }
}


export async function deleteUserAdmin(token, userUuid) {
    try{
        const requisition = await fetch(`${apiUrl}/admin/delete_user/${userUuid}`, {
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
        })
        if(requisition.ok){
            return requisition
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function getUnhiredworkers(token){
    try {
        const requisition = await fetch(`${apiUrl}/admin/out_of_work`, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
        })
        if(requisition.ok){
            return requisition.json()
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function hireUser(token, userUuid, departmentUuid) {
    let body = {
        "user_uuid": userUuid,
        "department_uuid": departmentUuid
    }

    try{
        const requisition = await fetch(`${apiUrl}/departments/hire/`, {
            method: "PATCH",
            headers: {
                "Content-Type"  : `application/json`,
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if(requisition.ok){
            return 'ok'
        }
        else {
            return requisition.status
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function dismissUser(token, userUuid) {
    try{
        const requisition = await fetch(`${apiUrl}/departments/dismiss/${userUuid}`, {
            method: "PATCH",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })

        if(requisition.ok){
            return 'ok'
        }
        else {
            return requisition.status
        }
    }
    catch(error){
        console.log(error)
    }
}


export async function editUser(token, username, email, password) {
    let body = {
        "username": username,
	    "password": email,
	    "email": password
    }

    try{
        const requisition = await fetch(`${apiUrl}/users`, {
            method: "PATCH",
            headers: {
                "Content-Type"  : `application/json`,
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if(requisition.ok){
            let response = await requisition.json()
            return 'ok'
        }
        else {
            return requisition.status
        }
    }
    catch(error){
        console.log(error)
    }
}

