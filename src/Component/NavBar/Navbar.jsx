import React from 'react';
import { Link,NavLink } from "react-router-dom";



const Navbar = ({user}) => {
    return ( 
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Vividly</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav mr-auto">
                        <NavLink className="nav-item nav-link" to="/posts">Posts</NavLink>
                        <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                        <NavLink className="nav-item nav-link" to="/customers">Customer</NavLink>
                        <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                       {!user && 
                        <React.Fragment>
                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                        </React.Fragment>
                        }
                        {user && 
                        <React.Fragment>
                        <NavLink className="nav-item nav-link" to="/profile">{user.name}</NavLink>
                        <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
                        </React.Fragment>
                        }
                    </div>
                </div>
            </nav>
        </React.Fragment>
  );
}
 
export default Navbar;