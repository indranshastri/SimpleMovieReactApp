import React, { Component } from 'react';


class Table extends Component {

    details = [];
    colHeader = [];
    constructor(props){
        super(props);
        this.details = props.details;
        this.colHeader = props.colHeader;
        this.getHeader = this.getHeader.bind(this);
    }

    getHeader(){
        if(!this.colHeader || this.colHeader.length <= 0) return ""
       
        return <thead className="thead-inverse">
                    <tr>
                        {  this.colHeader.map((ele,index)=><th key={index}>{ele}</th>) }
                    </tr>
                </thead>
        
    }

    render() { 
        return ( 
            
            <table className="table table-striped table-inverse table-responsive">
                {this.getHeader()}      
                {this.props.children}
            </table>
                
         );
    }
}
 
export default Table;