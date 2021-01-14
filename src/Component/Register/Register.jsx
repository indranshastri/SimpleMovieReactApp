import { errors } from 'joi-browser';
import React, { Component } from 'react';
import Form from "../Common/Form/Form";
import Joi from "joi-browser" 

class Register extends Form {
    state = { 
        data:{
            username:"",
            password:"",
            name:""
        },
        errors:{}
     }

     schema = {
        username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required()
                    .label("Username"),

        password: Joi.string()
                    .min(3)
                    .max(30)
                    .required()
                    .label("Password"),
        name: Joi.string()
                    .min(3)
                    .max(30)
                    .required()
                    .label("Name"),
     }


    doSubmit(){
        console.log("function after submit",this.state.data);
    }

    render() { 
        return ( 
            <div>
                <h1>Register</h1> 
                <form onSubmit={this.handelSubmit}>
                    {this.renderInput("text","username","Username")}
                    {this.renderInput("password","password","Password")}
                    {this.renderInput("text","name","Name")}
                    {this.renderButton("Register","submit")}
                </form>
            </div>
        );
    }
}
 
export default Register;