import React, { Component } from 'react';
import { Switch,Route,Redirect } from "react-router-dom";
import Form from '../Common/Form/Form';
import Joi from  'joi-browser';
import auth from '../../services/authService';

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
                    .email()
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


    async doSubmit(){
        try {
            const {data} = this.state
            await auth.login(data.username,data.password); 
            const {state} = this.props.location; 
            window.location = state ? state.from.pathname:"/";   
        } catch (ex) {
            console.log("ex",ex);
            if(ex.response &&  ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
       
    }
   
   

    render() {
        if(auth.getCurrentUser()) return <Redirect to="/"/>

        return ( 
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handelSubmit}>
                {this.renderInput("text","username","Username")}
                {this.renderInput("password","password","Password")}
                {this.renderButton("Login","submit")}
            </form>
        </div> 
        );
    }
}
 
export default Login;