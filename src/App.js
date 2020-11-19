import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import  MovieList from "./Component/Movies/MovieList";
import  Customers from "./Component/Customers/Customers";
import  Rental  from "./Component/Rental/Rental";
import  NotFound  from "./Component/NotFound/NotFound";
import { Switch,Route,Redirect } from "react-router-dom";
import React from 'react';
import Navbar from './Component/NavBar/Navbar'
function App() {
  return (
    <React.Fragment>
    <Navbar />
    <main role="main" className="container">
        <div className="starter-template">
         <Switch>
           <Route path="/movies" component={MovieList} />
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

export default App;
