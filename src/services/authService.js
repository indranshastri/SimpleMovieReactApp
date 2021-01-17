import http  from "./httpServices";
import { ApiEndPoint } from "../config.json";
import jwt_decode from 'jwt-decode';

const apiEndPoint = ApiEndPoint+"auth";
const tokenKey="token";



http.setJwt(getJwt());

export async  function login(username,password){
   const {data:jwt} =  await http.post(apiEndPoint,{
                                            email:username,
                                            password:password,       
                                        })

    loginWithJwt(jwt)

    
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwt_decode(jwt);
      } catch (ex) {
        return null;
      }
}

export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey,jwt);
    
}

export function getJwt(){
   return localStorage.getItem(tokenKey);
}


export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
}