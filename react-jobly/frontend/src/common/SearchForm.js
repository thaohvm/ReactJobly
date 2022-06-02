import React, { Component } from 'react';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSearch(this.state.searchQuery);
    }
    render() {
        return (
            <div className='SearchForm'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="searchQuery"
                        id="search"
                        value={this.state.searchQuery}
                        onChange={this.handleChange}
                    />
                    <button>Search</button>
                </form>
            </div>
        )
    }
}

export default SearchForm;
