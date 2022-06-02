import React, { Component } from 'react';
import CompanyCard from './CompanyCard';
import JoblyApi from "../api";
import SearchForm from '../common/SearchForm';

class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        }
        this.search = this.search.bind(this);
    }

    async componentDidMount() {
        let companies = await JoblyApi.getCompanies();
        console.log(companies);
        this.setState({ companies });
    }
    async search(query) {
        let companies = await JoblyApi.getFilterCompanies(query);
        this.setState({ companies });
    }

    render() {
        let { companies } = this.state;
        return (
            <div className='CompanyList'>
                <SearchForm handleSearch={this.search} />
                <h1> List of companies</h1>

                {companies.map(company => (
                    <CompanyCard
                        key={company.handle}
                        handle={company.handle}
                        name={company.name}
                        description={company.description}
                    />
                ))}
            </div>
        )
    }
}
export default CompanyList;
