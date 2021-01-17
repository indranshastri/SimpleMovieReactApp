import http  from "./httpServices";
import { ApiEndPoint } from "../config.json";

const apiEndPoint = ApiEndPoint+"users";


export function register(user){
    return http.post(apiEndPoint,{
        email:user.username,
        password:user.password,
        name:user.name
    })
}
