import React, { Component } from 'react';
import Form from '../Common/Form/Form';
import Joi from  'joi-browser';

class Login extends  Form {
    state = { 
        data:{
            username:"",
            password:""
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
     }


    doSubmit(){
        console.log("function after submit",this.state.data);
    }
   
   

    render() { 
        return ( 
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handelSubmit}>
                {this.renderInput("text","username","Username")}
                {this.renderInput("password","password","Password")}
                {this.renderButton("Login")}
            </form>
        </div> 
        );
    }
}
 
export default Login;