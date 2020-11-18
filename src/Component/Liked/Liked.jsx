import React from 'react';

const Liked = ({ele,onLiked}) => {
    let classes = "fa fa-heart"+(ele.favorite===0?"-o":"");
    return ( 
        <i style={{ cursor:"pointer" }} onClick={onLiked} className={classes} aria-hidden="true"/>
    );
}
export default Liked;