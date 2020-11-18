import React, { Component } from 'react';

class TableHeader extends Component {
    reSort(path){
        if(path==="") return null;
        let {onSort,sortColumn} = this.props;

        if(sortColumn.path==path)
            sortColumn.order = (sortColumn.order==="asc")?"desc":"asc";
        else
            sortColumn = {path ,order:"asc"};

        
        onSort(sortColumn);
    }

    renderSortIcon(movie){
        const {path,order} = this.props.sortColumn;
        
        if(path!==movie.path) return null;
        
        if(order==="asc") return <i className="fa fa-sort-asc ml-1"></i>

        return <i className="fa fa-sort-desc ml-1"></i>
    }

    render() { 
        const colHeader = this.props.colHeader;
        
        if(!colHeader || colHeader.length <= 0) return ""
        
        let eachWidth = (colHeader.length/100)+"%";

        return ( 
            <thead className="thead-inverse">
                <tr>
                    {  colHeader.map((ele,index)=>
                        <th style={{width: eachWidth}} 
                            key={index} 
                            onClick={()=>this.reSort(ele.path)}
                            className="clickable"
                            >
                            {ele.label}
                            {this.renderSortIcon(ele)}
                            
                        </th>
                        ) }
                </tr>
            </thead>
         );
    }
}
 
export default TableHeader;