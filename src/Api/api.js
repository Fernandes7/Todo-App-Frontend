import axios from "axios"
import { Url } from "./apiurl"

export const loginFunction=async(login_crediantials)=>{
try{
const responce=await axios.post(`${Url}/login`,{data:login_crediantials},{withCredentials:true})
return responce;
}
catch(e){
    return e.message;
}
}


export const signupFunction=async(signin_credinatials)=>{
    try{
        const response=await axios.post(`${Url}/signup`,{data:signin_credinatials})
        return response
    }
    catch(e){
        return e.message
    }
}


export const fetchUserdetails=async()=>{
    try{
    const responce=await axios.post(`${Url}/finduserbyid`,{},{withCredentials:true})
    return responce
    }
    catch(e){
        return e.message
    }
}


export const addProject=async(projectname)=>{
try{
const responce=await axios.post(`${Url}/addproject`,{data:{projectname:projectname}},{withCredentials:true})
return responce
}
catch(e)
{
    return(e.message)
}
}


export const viewProjects=async()=>{
    try{
    const responce=await axios.post(`${Url}/findprojectsbyuserid`,{},{withCredentials:true})
    return responce
    }
    catch(e){
        return e.message
    }
}

//Todo APIs

export const findprojectbyid=async(projectid)=>{
    try{
       const responce=await axios.post(`${Url}/findprojectbyid`,{data:projectid},{withCredentials:true})
       return responce; 
    }
    catch(e){
        return e.message
    }
}

export const editprojectnameapi=async(projectid,projectdata)=>{
    try{
    const editeddata=await axios.post(`${Url}/editproject`,{data:{id:projectid,project:projectdata}},{withCredentials:true})
    return editeddata
    }
    catch(e){
    return e.message
    }
}

export const addtodoapifunction=async(projectid,projectdata)=>{
    try{
    const responce=await axios.post(`${Url}/addtodo`,{data:{...projectdata,projectid:projectid}},{withCredentials:true})
    return responce
    }
    catch(e)
    {
        return e.message
    }
}

export const fetchalltodobyprojectid=async(projectid)=>{
    try{
    const responce=await axios.post(`${Url}/findtodobyprojectid`,{data:{projectid:projectid}},{withCredentials:true})
    return responce
    }
    catch(e)
    {
        return e.message
    }
}

