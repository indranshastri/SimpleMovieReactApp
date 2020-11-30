import React, { Component } from 'react';


const MovieDetails = ({match}) => {
return ( <h1>Movie details {match.params.id}</h1> );
}
 
export default MovieDetails;
 