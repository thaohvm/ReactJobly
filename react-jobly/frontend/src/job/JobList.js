import React, { Component } from "react";

import JoblyApi from "../api";
import JobCard from "./JobCard";
import SearchForm from "../common/SearchForm";
import CurrentUserContext from "../users/CurrentUserContext";

// { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }

class JobList extends Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      currentUser: null,
      appliedJobs: [],
    };
    this.search = this.search.bind(this);
    this.applyJob = this.applyJob.bind(this);
  }

  async componentDidMount() {
    let { currentUser, appliedJobs } = this.context;
    let jobs = await JoblyApi.getJobs();
    this.setState({ jobs, currentUser, appliedJobs });
  }

  async search(query) {
    let jobs = await JoblyApi.getFilterJobs(query);
    this.setState({ jobs });
  }

  async applyJob(jobId) {
    let { currentUser } = this.state;
    let application = await JoblyApi.applyToJob(currentUser, jobId);
    this.setState((st) => ({
      jobs: st.jobs.map((job) =>
        job.id === jobId ? { ...job, status: application } : job
      ),
    }));
  }

  render() {
    let { jobs, appliedJobs } = this.state;
    return (
      <div className="CompanyList">
        <SearchForm handleSearch={this.search} />
        <h1> List of jobs</h1>

        {jobs.map((job) => (
          <JobCard
            id={job.id}
            companyName={job.companyName}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            status={job.status}
            applyJob={this.applyJob}
            applied={appliedJobs.indexOf(job.id) > -1 ? true : false}
          />
        ))}
      </div>
    );
  }
}
export default JobList;
