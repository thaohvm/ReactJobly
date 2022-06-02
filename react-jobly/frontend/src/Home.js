import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from './users/CurrentUserContext';


class Home extends Component {

    static contextType = CurrentUserContext;

    render() {
        const currentUser = this.context.currentUser;
        let homeContent = (
            <div>
                <h1>Jobly</h1>
                <p>All the jobs in one, convenient place.</p>

                <Link to="/login">
                    <button className='btn btn-primary'>
                        Log in</button>
                </Link>
                <Link to="/signUp">
                    <button className='btn btn-primary'>
                        Sign up</button>
                </Link>
            </div>
        )

        if (currentUser) {
            homeContent = (
                <div>
                    <h1>Jobly</h1>
                    <p>All the jobs in one, convenient place.</p>
                    <h5>Welcome Back, {currentUser}</h5>
                </div>
            )
        }

        return (
            <div>
                {homeContent}
            </div>
        );

    }
}

export default Home;
