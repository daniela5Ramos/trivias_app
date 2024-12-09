import React, { useState, useEffect, createContext } from 'react';
import { storageController } from '../services/token';

import { usersService } from '../services/users';
import { tokenExpired } from '../utils/tokenExpired';

export const AuthContext = createContext();

export const AuthProvider = (props) => {

   

    const { children } = props;

    const [user, setUser] = userState(null)

    const [loading, setLoading] = userState(true)



    useEffect(() => {
        getSession();
    }, []); // Add dependency array to prevent continuous running

    const getSession = async () => {
        const token = await storageController.getToken();
        if(!token){

        
            logout()
        //console.log('Token -->', token);
        setLoading(false)
        return
    }if(tokenExpired(token)){
            logout()
        }else {
            login(token)
            
        }
    }

    const login = async (token) => {
        try {
            console.log("Obtenido", token);
            await storageController.setToken(token);
            const response = await usersService.getMe(token)
            setUser(response)
            setLoading(false)
            console.log(response)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const logout= async () =>{

        try {
            await storageController.removeToken()
            setUser(null)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            
        }
    }

    const data = {
        user,
        login,
        logout,
        updateUser: () => console.log('updateUser'),
    }

    if(loading) return null 

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
