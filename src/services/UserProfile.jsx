import CustomAxios from "./CustomAxios"

//add user in backend json file
export const  createUser = (data)=>{
    return CustomAxios.post("/user",data)
}

//get latest user
export const  getLatestuser = ()=>{
    return CustomAxios.get("/user")
}