import http  from "./httpServices";
import { ApiEndPoint } from "../config.json";

const apiEndPoint = ApiEndPoint+"movies";

export function getMovies(){
    return http.get(apiEndPoint);
}

function movieUrl(id){
    return `${apiEndPoint}/${id}`;
}

export function deleteMovie(movieId){
   return http.delete(movieUrl(movieId));
}
 
export function getMovie(movieId){
    return http.get(movieUrl(movieId));
}

export function saveData(data) {
    const body = {...data};
    delete body._id;

    if(data._id != undefined && data._id != ""){
        return http.put(movieUrl(data._id),body);
    }else{
        return http.post(apiEndPoint,body);
    }
   

}