import React from 'react';

const ListGroup = ({list,currentGenre,onFilterClick}) => {
    if(currentGenre==null){
        currentGenre={id:"",name:"All Genere"}
    }
    
    return ( 
            <div className="list-group mt-5">
                {
                    list.map((genre,index)=>{
                       return <button key={index} type="button" className={"list-group-item list-group-item-action "+(genre._id===currentGenre._id?"active":"")} onClick={()=>onFilterClick(genre)}>
                            {genre.name}
                        </button>
                    })
                }
            </div> 
        );
}
 
export default ListGroup;