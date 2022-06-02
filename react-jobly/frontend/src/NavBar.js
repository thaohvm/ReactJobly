import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from './users/CurrentUserContext';
import ProfileForm from './users/ProfileForm';
import './NavBar.css';
import {
    Nav, Navbar, NavbarBrand,
} from 'reactstrap';

/** Top navigation bar for site. */

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    static contextType = CurrentUserContext;

    logout() {
        localStorage.removeItem("token");
        document.location.href = "/";
    }

    render() {
        const currentUser = this.context;
        if (currentUser) {
            return (
                <Navbar bg="light" expand="lg">
                    <NavbarBrand exact to="/" className="navbar-brand">
                        Jobly
                    </NavbarBrand>
                    <Nav>
                        <NavLink exact to="/companies" className="navbar">
                            Companies
                        </NavLink>

                        <NavLink exact to="/jobs" className="navbar">
                            Jobs
                        </NavLink>

                        <NavLink exact to="/profile" className="navbar"
                            render={props => <ProfileForm {...props} />}>
                            Profile
                        </NavLink>

                        <NavLink exact to="/logout" className="navbar" onClick={this.logout}>
                            Log out "{currentUser}"
                        </NavLink>
                    </Nav>
                </Navbar>
            )
        } else {
            return (
                <Navbar bg="light" expand="lg">
                    <NavbarBrand exact to="/" className="navbar-brand">
                        Jobly
                    </NavbarBrand>
                    <Nav>
                        <NavLink exact to="/login">
                            Log in
                        </NavLink>

                        <NavLink exact to="/signup">
                            Sign up
                        </NavLink>
                    </Nav>
                </Navbar>
            )
        }
    }
}

export default NavBar;
