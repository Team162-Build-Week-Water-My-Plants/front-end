import React       from "react";
import { NavLink } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
    
    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
        <section className="nav-container">
            <header className="nav-header-container">
                <h1 className="nav-header">Water Your Plants!</h1>
            </header>
            <nav>
                <NavLink to="/my-plants" className="nav-links">
                    My Plants
                </NavLink>
                <NavLink to="/add-plant" className="nav-links">
                    Add Plant
                </NavLink>
                <NavLink to="/user-info" className="nav-links">
                    Account Settings
                </NavLink>
                <NavLink onClick={logout} to="/" className="nav-links">
                    Logout
                </NavLink>
            </nav>
        </section>
    );
};

export default Nav;
