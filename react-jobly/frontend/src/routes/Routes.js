import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CompanyList from '../company/CompanyList';
import Home from '../Home';
import LoginForm from '../users/LoginForm';
import SignUpForm from '../users/SignUpForm';
import CompanyDetail from '../company/CompanyDetail';
import JobList from '../job/JobList';
import JoblyApi from '../api';
import PrivateRoute from './PrivateRoute';
import ProfileForm from '../users/ProfileForm';
import CurrentUserContext from '../users/CurrentUserContext';

class Routes extends Component {
    constructor(props) {
        super(props);
                this.state = {
            token: null
        }
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.logout = this.logout.bind(this);
    }

    async signUp(data) {
        try {
            let token = await JoblyApi.signUp(data);
            localStorage.setItem("token", token);
            document.location.href = "/";
        } catch (err) {
            console.error("signUp failed", err);
            return { success: false, err }
        }
    }

    async login(data) {
        try {
            let token = await JoblyApi.login(data);
            localStorage.setItem("token", token);
            document.location.href = "/";
        } catch (err) {
            console.error("login failed", err);
            return { success: false, err }
        }
    }

    logout() {
        localStorage.removeItem("token");
        document.location.href = "/";
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/"
                        render={() => <Home />}
                    />
                    <Route exact path="/signup"
                        render={props => <SignUpForm handleSignUp={this.signUp} {...props} />}
                    />
                    <Route exact path="/login"
                        render={props => <LoginForm handleLogin={this.login} {...props} />}
                    />
                    <PrivateRoute path="/logout"
                        onClick={this.logout}
                    />
                    <PrivateRoute exact path="/companies"
                        render={props => <CompanyList {...props} />}
                    />
                    <PrivateRoute exact path="/companies/:handle"
                        render={props => <CompanyDetail {...props} />}
                    />
                    <PrivateRoute path="/jobs"
                        render={props => <JobList {...props} />}
                    />
                    <PrivateRoute path="/profile"
                    render={props => <ProfileForm {...props} />} />
                    <Redirect to="/" />
                </Switch>
            </div>
        )
    }
}
export default Routes;
