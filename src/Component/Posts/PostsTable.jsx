import React, {Component} from 'react';
import Table from '../Common/Table/Table';
import Liked from '../Liked/Liked';
import { Link } from "react-router-dom";

class PostsTable extends Component {
    columns = [
        {
            "path":"title",
            "label":"Title",
        },
        {
            "path":"",
            "label":"Action",
            "content":movie=> <div>
                                <button type="button" onClick={ () => this.props.onDelete(movie)}  name="deleteMovie" id="deleteMovie" className="btn btn-danger btn-xs mr-1">
                                <i className="fa fa-trash"></i> 
                                </button>
                                <button type="button" onClick={ () => this.props.onUpdate(movie)}  name="updateMovie" id="updateMovie" className="btn btn-warning btn-xs ml-1">
                                <i className="fa fa-pencil"></i> 
                                </button>
                             </div>
                           
        }
    ]

   
    
    render() { 
        const {rows,onSort,sortColumn} = this.props
        
        if(rows == undefined || rows.length===0) return null;
        
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
 
export default PostsTable;
