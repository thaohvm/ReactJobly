import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Routes from './routes/Routes';
import JoblyApi from './api';
import { decode } from "jsonwebtoken";
import CurrentUserContext from './users/CurrentUserContext';
import PrivateRoute from './routes/PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async componentDidMount() {
    let currentUser = await this.getCurrentUser();
    console.log(currentUser);
    if (currentUser !== undefined) {
      this.setState({ currentUser: currentUser.username });
    }
  }

  async getCurrentUser() {
    try {
      let token = localStorage.getItem("token");
      let { username } = decode(token);
      let currentUser = await JoblyApi.getUser(username);
      return currentUser;
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    let background = this.state.currentUser ? "" : "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80";

    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className='App' style={{ background: `url(${background})`}}>
          <BrowserRouter>
            <NavBar />
            <main>
              <Switch>
                <Routes render={props => <Route {...props} />} />
              </Switch>
            </main>
          </BrowserRouter>
        </div>
      </CurrentUserContext.Provider>
    )
  }
}

export default App;
