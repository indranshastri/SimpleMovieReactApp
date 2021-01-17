import React, {Component} from 'react';
import Table from '../Common/Table/Table';
import Liked from '../Liked/Liked';
import { Link } from "react-router-dom";
import auth from "../../services/authService";
class MoviesTable extends Component {
    user = "";
    columns = [
        {
            "path":"title",
            "label":"Title",
            "content": movie=> this.user? <Link to={`/movies/${movie._id}`}>{movie.title}</Link> : movie.title
            
        },
        {"path":"numberInStock","label":"Number In stock"},
        {"path":"genre.name","label":"Genre"},
        {"path":"dailyRentalRate","label":"Rate"},
        {
            "path":"favorite",
            "label":"Fav",
            "content": movie=><Liked onLiked={()=>this.props.onLiked(movie)} ele = {movie}/> 
        },
       
    ];

    deleteColumn =  {
        "path":"",
        "label":"Action",
        "content":movie=>  <button type="button" onClick={ () => this.props.onDelete(movie)}  name="deleteMovie" id="deleteMovie" className="btn btn-danger btn-xs">
                            <i className="fa fa-trash"></i> 
                            </button>
                       
    };

    constructor(){
        super()
        this.user = auth.getCurrentUser();
        
        if(this.user && this.user.isAdmin)
            this.columns.push(this.deleteColumn);
    }
    
    
    
    render() { 
        const {rows,onSort,sortColumn} = this.props
        
        if(rows.length===0) return null;
    
        return ( 
            
            <Table
                data={rows}
                onSort={onSort}
                sortColumn={sortColumn}
                columns={this.columns}
            />
        );
    }
}
 
export default MoviesTable;
