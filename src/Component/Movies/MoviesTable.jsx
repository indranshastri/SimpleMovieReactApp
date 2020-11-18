import React, {Component} from 'react';
import Table from '../Common/Table/Table';
import Liked from '../Liked/Liked';

class MoviesTable extends Component {
    columns = [
        {"path":"Title","label":"Title"},
        {"path":"Production Budget","label":"Production Budget"},
        {"path":"Release Date","label":"Release Date"},
        {"path":"Major Genre","label":"Major Genre"},
        {"path":"IMDB Rating","label":"IMDB Rating"},
        {"path":"IMDB Votes","label":"IMDB Votes"},
        {
            "path":"favorite",
            "label":"Fav",
            "content": movie=><Liked onLiked={()=>this.props.onLiked(movie)} ele = {movie}/> 
        },
        {
            "path":"",
            "label":"Action",
            "content":movie=> <button type="button" onClick={ () => this.props.onDelete(movie)}  name="deleteMovie" id="deleteMovie" className="btn btn-danger btn-lg btn-block">
                                <i className="fa fa-trash"></i> 
                                </button>
                           
        },
    ]

   
    
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
