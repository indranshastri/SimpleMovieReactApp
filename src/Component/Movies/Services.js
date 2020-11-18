import MainData  from "../../Data/MovieDetails.json";

const currentData = [...MainData];

export function getMovies(){
    return  currentData
}

export function getTotalCounts(){
    return currentData.length;
}

export function deleteMovie(ele){
   // let index = ;
   currentData.splice(currentData.indexOf(ele),1);
    return currentData;
}

export function AllUniqueGenre(){
   return MainData.map(e=>e["Major Genre"]).filter((e,i,self)=>e!==null && self.indexOf(e)===i);
}
