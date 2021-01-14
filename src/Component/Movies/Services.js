import MainData  from "../../Data/MovieDetails.json";

let currentData = [...MainData];

export function getMovies(){
    return  currentData
}
export function getMovie(id){
    return  currentData.filter((ele)=>ele.id == id)[0];
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

export function saveData(data) {
    
    if(data.id != undefined && data.id != ""){
        const index = MainData.findIndex(obj=>obj.id==data.id);
        MainData[index] = {...data}; 
    }else{
        let sortedData = MainData.sort((a,b)=>{
            if (a.id > b.id)
                return -1;
            if (a.id < b.id)
                return 1;
            return 0;
        })
        let newData = {...data};
        newData.id = sortedData[0].id+1;
        
        MainData.unshift(newData);
    }
    currentData = [...MainData]

}
