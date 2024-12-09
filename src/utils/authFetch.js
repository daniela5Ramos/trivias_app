

import { storageController } from "../services/token"
import { tokenExpired } from "./tokenExpired"

export const authFetch = async(url, params) => {
    console.log('Hola desde AuthFetch')

    const token = await storageController.getToken()

    const logout = () =>{
        storageController.removeToken()
    }
    if(!token){
        logout()
    }else{
        if(tokenExpired(token)){
            logout()
        }
        else {
            const options= {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization : `Bearer ${token}`
                }
            }
            try {
                return await fetch (url, options)
                
            } catch (error) {
                console.error(error)
            }
        }
        const response = tokenExpired(token)
        console.log('Response authFetch', response)
    }
}
