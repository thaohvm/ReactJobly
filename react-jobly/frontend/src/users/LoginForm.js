import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleLogin(this.state, this.props.history);
    }

    render() {
        return (
            <div className='LoginForm'>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username: </label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button className='btn btn-primary'>Login</button>
                </form>
            </div>
        )
    }
}
export default LoginForm;
