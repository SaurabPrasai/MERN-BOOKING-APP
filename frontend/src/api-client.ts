import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";


const API_BASE_URL=import.meta.env.VITE_API_BASE_URL||""

export const register=async(formData:RegisterFormData)=>{
const response=await fetch(`${API_BASE_URL}/api/user/register`,{
    method:"POST",
    credentials:"include",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(formData)
})
const responseBody=await response.json();

if(!response.ok){
    throw new Error(responseBody.msg)
}
}

export const validateToken=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
    credentials:"include"
    })

    if(!response.ok){
        throw new Error("Invalid token")
    }
    return response.json();
}


export const login=async(formData:LoginFormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    const responseBody=await response.json();
    if(!response.ok){
        throw new Error(responseBody.msg)
    }
}

export const logout=async()=>{
        const response=await fetch(`${API_BASE_URL}/api/auth/logout`,{
            credentials:"include"
        })
        const resBody=await response.json()
        if(!response.ok){
            throw new Error(resBody.msg)
        }
        return resBody;
}



// My hotel

export const addMyHotel=async(hotelFormData:FormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:"POST",
        credentials:"include",
        body:hotelFormData
    })
    if(!response.ok){
        throw new Error("Failed to add hotel")
    }
    return response.json();
}