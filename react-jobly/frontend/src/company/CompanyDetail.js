import React, { Component } from 'react';
import JoblyApi from '../api';
import JobCard from '../job/JobCard';
import CurrentUserContext from '../users/CurrentUserContext';

class CompanyDetail extends Component {
    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);
        this.state = {
            company: { jobs: [] }
        }
        this.applyJob = this.applyJob.bind(this);
    }

    async componentDidMount() {
        let company = await JoblyApi.getCompany(this.props.match.params.handle);
        console.log(company)
        let jobs = [...this.state.company.jobs];
        console.log(jobs)
        this.setState({ company });
    }

    async applyJob(jobId) {
        let currentUser = this.context;
        await JoblyApi.applyToJob(currentUser, jobId);

    }

    render() {
        let { company } = this.state;
        return (
            <div>
                <h2>{company.name}</h2>
                <p>{company.description}</p>
                {company.jobs.map(job =>
                    <ol><JobCard
                        id={job.id}
                        companyName={job.companyName}
                        title={job.title}
                        salary={job.salary}
                        equity={job.equity}
                        applyJob={this.applyJob}
                    />
                    </ol>)}
            </div>
        );
    }
}
export default CompanyDetail;
