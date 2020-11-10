import React, { Component } from 'react'
import ListGroup from '../Common/listGroup/listGroup';
import Pagination from '../Common/Pagination/Pagination';
import Table from '../Common/Table/Table';
import Liked from '../Liked/Liked';
import { paginate } from '../utils/paginate';



import {getMovies,getTotalCounts,deleteMovieAt,AllUniqueGenre} from "./Services";

class MovieList extends Component {
    perPage = 5
    state = { 
        movies:getMovies(this.perPage),
        pageSize:this.perPage,
        currentPage:1,
        genre:AllUniqueGenre(),
        currentGenre:'All Genre'
    }
    colsToShow = [
        "Title","Production Budget","Release Date","Major Genre","IMDB Rating","IMDB Votes"
    ]
    colHeader = [
        "Title","Production Budget","Release Date","Major Genre","IMDB Rating","IMDB Votes","Fav","Action"
    ]
    constructor(){
        super();
        this.handelDeleteClick = this.handelDeleteClick.bind(this);
        this.handelFavClick = this.handelFavClick.bind(this);
        this.getRows = this.getRows.bind(this);
        this.handelPageChange = this.handelPageChange.bind(this);
    }
   
   
    handelFavClick(ele){
        const movies = this.state.movies;
        const index = movies.indexOf(ele);
        movies[index].favorite = !ele.favorite?1:0;
        this.setState({movies})
    }

   
    handelDeleteClick(index){
       let movies = deleteMovieAt(index);
       this.setState({movies:movies})
    }

    handelPageChange = page =>this.setState({currentPage:page})
    
    handelGenreClick = genre => {
        this.setState({currentGenre:genre,currentPage:1});
        
    }
    
    getRows(filtered){
        if(!filtered || filtered.length <= 0) return null
       
       return <tbody>
                    {
                        filtered.map((ele,index)=>{
                           return (
                                <tr key={index}>
                                    { 
                                        Object.entries(ele).map((value,index)=>{
                                            return (this.colsToShow.includes(value[0]))? <td key={index}>{value[1]}</td>:null
                                        })
                                    }
                                    <td>
                                        <Liked onLiked={()=>this.handelFavClick(ele)} ele = {ele}/>
                                    </td>
                                    <td>
                                        <button type="button" onClick={ () => this.handelDeleteClick(index)}  name="deleteMovie" id="deleteMovie" className="btn btn-danger btn-lg btn-block">
                                          <i className="fa fa-trash"></i> 
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
    }

    componentDidMount(){
        const genre =this.state.genre;
        genre.unshift("All Genre");
        this.setState({genre});
    }
    render() { 
        const { length:count} = this.state.movies; 
        const {movies,currentPage,pageSize,currentGenre} = this.state;
        const fromRecord = currentPage===1?currentPage:(currentPage*pageSize)-(pageSize-1);
        const toRecord = fromRecord+(pageSize-1);
        const filtered = currentGenre==="All Genre"?movies: movies.filter(e=>e["Major Genre"]==currentGenre);
        const rows = paginate(filtered,currentPage,pageSize);
        const filteredCount = filtered.length;
        return ( 
            <div>
                <div className="row">
                    <div className="col-md-2">             
                        <ListGroup list={this.state.genre} onFilterClick={this.handelGenreClick} currentGenre={this.state.currentGenre} />
                    </div>
                    <div className="col-md">
                        <h1> Movie List </h1>
                        <p> Showing {fromRecord} to {(filteredCount-toRecord)>=0?toRecord:filteredCount} of {filteredCount} records for movies</p>
                        <Table 
                            details = {this.state.movies} 
                            colHeader={this.colHeader}
                            colsToShow = {this.colsToShow}
                            >
                            {this.getRows(rows)}
                        </Table>
                        <Pagination 
                        totalCount={filtered.length} 
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