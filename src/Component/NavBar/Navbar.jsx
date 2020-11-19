import React from 'react';
import { Link,NavLink } from "react-router-dom";



const Navbar = (props) => {
    return ( 
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Vividly</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav mr-auto">
                        <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                        <NavLink className="nav-item nav-link" to="/customers">Customer</NavLink>
                        <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                    </div>
                </div>
            </nav>
        </React.Fragment>
  );
}
 
export default Navbar;