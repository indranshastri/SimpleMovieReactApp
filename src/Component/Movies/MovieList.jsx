import React, { Component } from 'react'

import {getMovies,getTotalCounts,deleteMovieAt} from "./Services";


class MovieList extends Component {
    
    state = { 
        movies:getMovies(),
    }
    colsToShow = [
        "Title","Production Budget","Release Date","Major Genre","IMDB Rating","IMDB Votes"

    ]
    constructor(){
        super();
        this.getRows = this.getRows.bind(this);
        this.getHeader = this.getHeader.bind(this);
        this.handelDeleteClick = this.handelDeleteClick.bind(this);
    
    }
    getHeader(){
        if(!this.state.movies || this.state.movies.length <= 0) return ""
       
        let cols = Object.keys(this.state.movies[0]);

        return <thead className="thead-inverse">
                    <tr>
                    {
                        cols.map((ele,index)=>{
                        return (this.colsToShow.includes(ele))? <th key={index}>{ele}</th>:null
                        })
                    }
                    <th>Delete</th>
                    </tr>
                </thead>
        
    }
    getRows(){
        if(!this.state.movies || this.state.movies.length <= 0) return ""
        let rows = [] 
        rows = this.state.movies;
        return <tbody>
                    {
                        rows.map((ele,index)=>{
                           return (
                                <tr key={index}>
                                    { 
                                        Object.entries(ele).map((value,index)=>{
                                            return (this.colsToShow.includes(value[0]))? <td key={index}>{value[1]}</td>:null
                                        })
                                    }
                                    <td>
                                        <button type="button" onClick={ () => this.handelDeleteClick(index)}  name="deleteMovie" id="deleteMovie" className="btn btn-danger btn-lg btn-block">
                                          <i className="fa fa-trash"></i>  Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
    }

    handelDeleteClick(index){
       let movies = deleteMovieAt(index);
       this.setState({movies:movies})
    }
    getTable(){
        if(!this.state.movies || this.state.movies.length <= 0) return "There are no records to display"

        return  <table className="table table-striped table-inverse table-responsive">
                    {this.getHeader()}      
                    {this.getRows()}
                </table>
    }
           

    render() { 
        return ( 
            <div>
                <h1> Movie List </h1>
                <p> Showing {this.state.movies.length} of {getTotalCounts()} records for movies</p>
                {this.getTable()}
            </div>
            );
    }
}
 
export default MovieList;