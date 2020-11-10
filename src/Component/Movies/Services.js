import MainData  from "../../Data/MovieDetails.json";


export function getMovies(){
    return  MainData
}

export function getTotalCounts(){
    return MainData.length;
}

export function deleteMovieAt(index){
    return MainData.splice(index,1);
}

export function AllUniqueGenre(){
   return MainData.map(e=>e["Major Genre"]).filter((e,i,self)=>e!==null && self.indexOf(e)===i);
}
