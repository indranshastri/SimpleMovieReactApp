import MainData  from "../../Data/MovieDetails.json";

var data;
var limit=10

export function getMovies(){
    return  MainData
}

export function getTotalCounts(){
    return MainData.length;
}

export function deleteMovieAt(index){
    MainData.splice(index,1);
    let data = MainData;
    return data.slice(0,limit)
}

export function genere(index){
    MainData.splice(index,1);
    let data = MainData;
    return data.slice(0,limit)
}
