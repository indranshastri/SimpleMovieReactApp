import React, { Component } from 'react';
import _ from 'lodash'
class TableBody extends Component {

    renderCell = (item,column)=>{
        if(column.content) return column.content(item);

        return _.get(item,column.path)
    }

    createKey=(item,column)=>item.id+(column.path||column.key)

    render() { 
        const {data,columns} = this.props;

        if(!data || data.length <= 0) return  <tbody><tr><td colSpan='100%'><center><strong> No related Records found </strong></center></td></tr></tbody>;
    
        return (
            <tbody>
                {
                    data.map((item)=><tr key={item.id}>
                        {columns.map((column)=><td key={this.createKey(item,column)}>
                            {this.renderCell(item,column)}
                        </td>)}
                    </tr>)
                }
            </tbody>
          );
    }
}
 
export default TableBody;