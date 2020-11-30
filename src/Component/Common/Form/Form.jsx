import React, { Component } from 'react'
import Input from '../Input/Input';
import Joi from 'joi-browser';
import { result } from 'lodash';

class From extends Component {

    state = { 
        data:{},
        errors:{}
     }

    validate = ()=>{
        const options = {abortEarly:false};
        const result = Joi.validate(this.state.data,this.schema,options);
        
        if(!result.error) return null;

        const reducer = (accumulator,currentValue) =>{
            accumulator[currentValue.path[0]] =  accumulator[currentValue.path[0]] === undefined? currentValue.message:accumulator[currentValue.path[0]];
            return accumulator;
        } 

        return result.error.details.reduce(reducer,[]);
    }

    validateProperty = ({name,value})=>{
        const schema = {[name]:this.schema[name]};
        const obj = {[name]:value}
        const {error} = Joi.validate(obj,schema);
        return (error)?error.details[0].message : null;
    }
    
   handelChange = ({currentTarget:input}) =>{
        const errors = {...this.state.errors};
        errors[input.name] = this.validateProperty(input);
        
        const data = {...this.state.data};
        data[input.name] = input.value;
        
        this.setState({data,errors});
    }

    handelSubmit= e=>{
        e.preventDefault();
       const errors = this.validate();
       if(errors){
           this.setState({errors});
           return null;
       }
       this.doSubmit();
    }

    renderInput=(type,name,label)=>{
        const {data,errors} = this.state;
        return <Input 
                    type={type} 
                    name={name}  
                    label={label}
                    error ={errors[name]}
                    onChange ={this.handelChange}
                    value ={data[name]}
                    />
    }

    renderButton(label){
    return  <button 
                type="button" 
                disabled={this.validate()}
                className="btn btn-primary mt-2" 
                role="button" 
               > 
                { label}
            </button>
    }
   
}
 
export default From;