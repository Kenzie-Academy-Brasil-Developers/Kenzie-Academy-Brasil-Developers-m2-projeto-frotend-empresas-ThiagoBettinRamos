import { verifyUserType } from "../../scripts/apiPublic.js";

export async function authentication(){
    const token = JSON.parse(localStorage.getItem("@thiagobettin/empresas:token"))
    if(!token){
        window.location.assign("../login/login.html")
    }else{
        let isAdmin = await verifyUserType(token)
        if(isAdmin && window.location.pathname !== "/pages/admin-page/admin.html"){
            window.location.assign("../admin-page/admin.html")
        }
        if(isAdmin === undefined){
            window.location.assign("../login/login.html")
        }
        if(isAdmin === false && window.location.pathname !== "/pages/user-page/user.html"){
            window.location.assign("../user-page/user.html")
        }
    }
}

