
import { Switch,Route,Redirect } from "react-router-dom";
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';


import  MovieList from "./Component/Movies/MovieList";
import  Customers from "./Component/Customers/Customers";
import  Rental  from "./Component/Rental/Rental";
import  NotFound  from "./Component/NotFound/NotFound";
import Navbar from './Component/NavBar/Navbar'
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import MovieForm from "./Component/Movies/MovieForm";
import PostsList from './Component/Posts/PostsList';
import Logout from "./Component/Logout/Logout";
import ProtectRoute from "./Component/Common/ProtectedRoute/ProtectedRoute";

import auth from './services/authService';

class App extends Component {
  state = {};

  componentDidMount()
  {
    const user = auth.getCurrentUser();
   
    this.setState({user});
  }

  render(){
    const {user} = this.state;
    
    return (
      <React.Fragment>
      <Navbar user={user} />
      <main role="main" className="container">
          <div className="starter-template">
            <ToastContainer />
           <Switch>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={Register} />
              <Route path="/posts" component={PostsList} />
              <ProtectRoute path="/movies/:id" component={MovieForm} />
              <Route path="/movies" render={ props=><MovieList {...props} user={user} />} />
              <Route path="/customers" component={Customers} />
              <Route path="/rental" component={Rental} />
              <Route path="/not-found" component={NotFound} />
             
              <Redirect exact from="/" to="/movies"/>
              <Redirect  to="/not-found"/>
           </Switch>
          </div>
      </main>
      </React.Fragment>
    );  
  }
  
}

export default App;
