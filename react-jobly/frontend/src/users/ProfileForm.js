import React, { Component } from 'react';
import JoblyApi from '../api';
import CurrentUserContext from './CurrentUserContext';

class ProfileForm extends Component {
    static contextType = CurrentUserContext;

    constructor(props, context) {
        super(props);
        let currentUser = context;
        console.log(currentUser);
        this.state = {
            username: currentUser,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            let data = {
                firstName: this.state.firstName || undefined,
                lastName: this.state.lastName || undefined,
                email: this.state.email || undefined,
                password: this.state.password
            }
            await JoblyApi.updateProfile(this.state.username, data);
            this.setState({ password: "" }, () => alert("Updated"));
        } catch (e) {
            alert("Update failed!");
            console.log(e);
        }
    }

    render() {
        return (
            <div className='ProfileForm'>
                <h1>Profile</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username: {this.state.username}</label>
                    </div>
                    <div>
                        <label htmlFor='firstName'>First Name: </label>
                        <input
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name: </label>
                        <input
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Confirm password to make changes: </label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button className='btn btn-primary'>Save Changes</button>
                </form>
            </div>
        )
    }
}
export default ProfileForm;
