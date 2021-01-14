import React, { Component } from 'react'
import ListGroup from '../Common/listGroup/listGroup';
import Pagination from '../Common/Pagination/Pagination';

import MoviesTable from './MoviesTable';

import { paginate } from '../utils/paginate';
import _ from 'lodash'
import { Link,NavLink } from "react-router-dom";


import {getMovies,deleteMovie,AllUniqueGenre} from "./Services";


class MovieList extends Component {
    perPage = 5
    state = { 
        movies:[],
        pageSize:this.perPage,
        currentPage:1,
        genre:[],
        currentGenre:'All Genre',
        sortColumn:{path:'Title',order:'asc'}
    }
  
    
    constructor(){
        super();
        this.handelDeleteClick = this.handelDeleteClick.bind(this);
        this.handelFavClick = this.handelFavClick.bind(this);
        this.handelPageChange = this.handelPageChange.bind(this);
        this.handelSort = this.handelSort.bind(this);
    }
   
    componentDidMount(){
        const genre = ["All Genre", ...AllUniqueGenre()];
        this.setState({movies:getMovies(this.perPage),genre})
    }
   
    handelFavClick(ele){
        const movies = this.state.movies;
        const index = movies.indexOf(ele);
        movies[index].favorite = !ele.favorite?1:0;
        this.setState({movies})
    }

   
    handelDeleteClick(ele){
       let movies = deleteMovie(ele);
       this.setState({movies:movies})
    }

    handelPageChange = page =>this.setState({currentPage:page})
    
    handelGenreClick = genre =>  this.setState({currentGenre:genre,currentPage:1});
    
    handelSort = sortColumn =>this.setState({sortColumn});

    showingDetails(fromRecord,filteredCount,toRecord){
        if(filteredCount===0) return <p> No reords found to show</p>;
        return  <p> Showing {fromRecord} to {(filteredCount-toRecord)>=0?toRecord:filteredCount} of {filteredCount} records for movies</p>;
    }

    getPageData = ()=>{
        const {movies,currentPage,pageSize,currentGenre,sortColumn} = this.state;

        const filtered = currentGenre==="All Genre"?movies: movies.filter(e=>e["Major Genre"]===currentGenre);
        const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
        const rows = paginate(sorted,currentPage,pageSize);
        const filteredCount = filtered.length;
        const fromRecord = filteredCount===0?0:currentPage===1?currentPage:(currentPage*pageSize)-(pageSize-1);
        const toRecord = filteredCount===0?0:fromRecord+(pageSize-1);
       
        return {fromRecord,toRecord,filteredCount,rows}
    }

   
    render() { 
        const {currentPage,pageSize,sortColumn,genre} = this.state;
        const {fromRecord,toRecord,filteredCount,rows} = this.getPageData();
        return ( 
            <div>
               
                <div className="row">
                    <div className="col-md-2">             
                        <ListGroup list={genre} onFilterClick={this.handelGenreClick} currentGenre={this.state.currentGenre} />
                    </div>
                    <div className="col-md">
                        <div className="mb-3">
                         <h1 className="pull-left"> Movie List </h1>
                         <Link to="/movies/new" className="btn btn-primary pull-right mt-2" role="button">Add New Movie</Link>
                        
                        </div>
                        <div className="clearfix"></div>                      
                       { this.showingDetails(fromRecord,filteredCount,toRecord) }
                       
                        <MoviesTable
                            rows = {rows}
                            sortColumn={sortColumn}
                            onLiked={this.handelFavClick}
                            onDelete={this.handelDeleteClick}
                            onSort={this.handelSort}
                        />
                        <Pagination 
                        totalCount={filteredCount} 
                        perPage={pageSize}
                        currentPage = {currentPage}
                        onPageChange ={this.handelPageChange} 
                        />
                    </div>
                </div>
                
            </div>
            );
    }
}
 
export default MovieList;