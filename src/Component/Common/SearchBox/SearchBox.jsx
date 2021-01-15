import React from 'react';
import Input from '../Input/Input';

const SearchBox = ({value,onChange,onClear}) => {
    function getIconClass(searchvalue){
        if(searchvalue!=undefined && searchvalue.length > 0){
            return <i className="fa fa-times input-icon  my-3 mb-3" style={{cursor:'pointer'}} onClick={e=>onClear()}/>;
        }
        return <i className="fa fa-search input-icon  my-3 mb-3"></i>;
    }
    return ( 
        <div className="input-wrapper">
            {getIconClass(value)}
            <Input
                type="text"
                name="query"
                classNames="form-control my-3 mb-3"
                placeholder="Search..."
                value={value}
                onChange={e=>onChange(e.target.value)}
            />
        </div>
     );
}

 
export default SearchBox;