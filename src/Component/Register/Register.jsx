import { errors } from 'joi-browser';
import React, { Component } from 'react';
import Form from "../Common/Form/Form";
import Joi from "joi-browser" 
import * as userService from "../../services/userService";
import auth from "../../services/authService";
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


    async doSubmit(){
        try {
            const response = await userService.register(this.state.data);   
            auth.loginWithJwt(response.headers["x-auth-token"])
            window.location = "/"; 
        } catch (ex) {
            if(ex.response && ex.response.status ===400){
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
        
        
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