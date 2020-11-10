import React from 'react';

const ListGroup = ({list,currentGenre,onFilterClick}) => {
    return ( 
            <div className="list-group mt-5">
                {
                    list.map((genre,index)=>{
                       return <button key={index} type="button" className={"list-group-item list-group-item-action "+(genre===currentGenre?"active":"")} onClick={()=>onFilterClick(genre)}>
                            {genre}
                        </button>
                    })
                }
            </div> 
        );
}
 
export default ListGroup;