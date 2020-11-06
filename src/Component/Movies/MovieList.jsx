import React, { Component } from 'react'
import Pagination from '../Common/Pagination/Pagination';
import Table from '../Common/Table/Table';
import Liked from '../Liked/Liked';
import { paginate } from '../utils/paginate';



import {getMovies,getTotalCounts,deleteMovieAt} from "./Services";

class MovieList extends Component {
    perPage = 5
    state = { 
        movies:getMovies(this.perPage),
        pageSize:this.perPage,
        currentPage:1
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

    handelPageChange = page =>{
        console.log(page);
    //    const movies = getMovies(this.state.pageSize,this.perPage.page) 
       this.setState({currentPage:page})
    }
    
    getRows(){
        const {movies,currentPage,pageSize} = this.state
        if(!movies || movies.length <= 0) return null
        const rows = paginate(movies,currentPage,pageSize);

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

    render() { 
        const { length:count} = this.state.movies; 
        const {currentPage,pageSize} = this.state;
        const fromRecord = currentPage==1?currentPage:(currentPage*pageSize)-(pageSize-1);
        const toRecord = fromRecord+(pageSize-1);

        return ( 
            <div>
                <h1> Movie List </h1>
                <p> Showing {fromRecord} to {(count-toRecord)>=0?toRecord:count} of {count} records for movies</p>
                <Table 
                    details = {this.state.movies} 
                    colHeader={this.colHeader}
                    colsToShow = {this.colsToShow}
                    >
                    {this.getRows()}
                </Table>
                <Pagination 
                totalCount={getTotalCounts()} 
                perPage={pageSize}
                currentPage = {currentPage}
                onPageChange ={this.handelPageChange} 
                />
            </div>
            );
    }
}
 
export default MovieList;