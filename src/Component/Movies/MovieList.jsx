import React, { Component } from 'react'
import ListGroup from '../Common/listGroup/listGroup';
import Pagination from '../Common/Pagination/Pagination';

import MoviesTable from './MoviesTable';

import { paginate } from '../utils/paginate';
import _ from 'lodash'
import { Link,NavLink } from "react-router-dom";
import {getGenres} from "../../services/genereService";

import {getMovies,deleteMovie} from "../../services/movieService";
import SearchBox from '../Common/SearchBox/SearchBox';
import { toast } from "react-toastify";


class MovieList extends Component {
    perPage = 5
    state = { 
        movies:[],
        pageSize:this.perPage,
        currentPage:1,
        genre:[],
        currentGenre:{id:"",name:"All Genere"},
        sortColumn:{path:'title',order:'asc'},
        searchQuery:''
    }
  
    
    constructor(){
        super();
        this.handelDeleteClick = this.handelDeleteClick.bind(this);
        this.handelFavClick = this.handelFavClick.bind(this);
        this.handelPageChange = this.handelPageChange.bind(this);
        this.handelSort = this.handelSort.bind(this);
        this.handelSearch = this.handelSearch.bind(this);
        this.handelSearchClear = this.handelSearchClear.bind(this);
    }
   
    async componentDidMount(){
        const {data:genreData} = await getGenres();
        const genre = [{"id":"",name:"All Genre"}, ...genreData];

        const {data:movies} = await getMovies();
       
        this.setState({movies,genre})
    }
   
    handelFavClick(ele){
        const movies = this.state.movies;
        const index = movies.indexOf(ele);
        movies[index].favorite = !ele.favorite?1:0;
        this.setState({movies})
    }

   
    async handelDeleteClick(movie){
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m=>m._id !== movie._id);
        this.setState({movies})
        try {
            await deleteMovie(movie._id);
        } catch (error) {
            if(error.response && error.response.status == 404){
                toast.error("this post has already been deleted");
            }
            this.setState({movies:originalMovies});
        }

    }

    handelPageChange = page =>this.setState({currentPage:page})
    
    handelGenreClick = genre => this.setState({searchQuery:"",currentGenre:genre,currentPage:1}); 
   

    
    handelSort = sortColumn =>this.setState({sortColumn});

    handelSearch = query =>{
        this.setState({searchQuery:query,currentGenre:null,currentPage:1})
    }
    handelSearchClear = () => {
        this.setState({searchQuery:"",currentGenre:null,currentPage:1})
    }

    showingDetails(fromRecord,filteredCount,toRecord){
        if(filteredCount===0) return <p> No reords found to show</p>;
        return  <p> Showing {fromRecord} to {(filteredCount-toRecord)>=0?toRecord:filteredCount} of {filteredCount} records for movies</p>;
    }

    getPageData = ()=>{
        const {movies,currentPage,pageSize,currentGenre,sortColumn,searchQuery} = this.state;
    
        let filtered = movies; 
        if(searchQuery)
            filtered = movies.filter(m=>m.title.toLowerCase().includes(searchQuery.toLowerCase()));    
        else if(currentGenre)
            filtered = currentGenre.id===""?movies: movies.filter(e=>e.genre._id===currentGenre._id);
        
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
        const {user} = this.props;
        return (
            <div>
               
                <div className="row">
                    <div className="col-md-2">             
                        <ListGroup list={genre} onFilterClick={this.handelGenreClick} currentGenre={this.state.currentGenre} />
                    </div>
                    <div className="col-md">
                        <div className="mb-3">
                         <h1 className="pull-left"> Movie List </h1>
                         {user && <Link to="/movies/new" className="btn btn-primary pull-right mt-2" role="button">Add New Movie</Link>}
                        </div>
                        <div className="clearfix"></div>                      
                       { this.showingDetails(fromRecord,filteredCount,toRecord) }
                       <SearchBox value={this.state.searchQuery} onChange={this.handelSearch} onClear={this.handelSearchClear} />
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