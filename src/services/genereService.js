import http  from "./httpServices";
import { ApiEndPoint } from "../config.json";



export  function getGenres() {
   return http.get(ApiEndPoint+"genres");
}