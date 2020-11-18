import TableBody from './TableBody';
import TableHeader from './TableHeader';
import React from 'react';

const Table= (props) => {
    const {columns,onSort,sortColumn,data} = props;
    return ( 
            <table className="table table-striped table-inverse table-responsive">
                <TableHeader 
                    colHeader={columns} 
                    onSort={onSort} 
                    sortColumn={sortColumn}
                />
                <TableBody
                data = {data}
                columns = {columns}
                />
            </table> 
    );
}
 
export default Table;