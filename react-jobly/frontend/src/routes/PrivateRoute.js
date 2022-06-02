import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CurrentUserContext from '../users/CurrentUserContext';

class PrivateRoute extends Component {
    static contextType = CurrentUserContext;

    render() {
        if (!this.context) {
            return <Redirect to='/login' />
        }
        return (
            <Route
                path={this.props.path}
                render={this.props.render}>
            </Route>
        )
    }
}
export default PrivateRoute;
