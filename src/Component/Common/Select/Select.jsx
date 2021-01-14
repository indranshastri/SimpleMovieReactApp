import React from 'react'

export default function Select({name,selectedValue="",options=[],label,error="",classNames="form-control",...rest}) {
    return (
      <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className={classNames} id={name}  name={name} value={selectedValue} {...rest}>
        <option value="">--Please select--</option>
        {options.map( ({optValue,optLabel},index)=>{
            return <option key={index} value={optValue}>{optLabel}</option>
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
    )
}
