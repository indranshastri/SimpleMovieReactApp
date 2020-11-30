import React from 'react';

const Input = ({name,type,label,error="",classNames="form-control",...rest}) => {
    
    return (
        <div className={(error && "form-group  error") || "from-group"}>
          <label htmlFor={name}>{label}</label>
          <input 
            type={type} 
            name={name} 
            id={name} 
            aria-describedby={name}
            className={classNames} 
            {...rest} />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>

      );
}
 
export default Input;

