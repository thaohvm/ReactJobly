import React, { Component } from "react";

// { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }

class JobCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      applied: false,
      disable: false,
    };
    this.handleApply = this.handleApply.bind(this);
  }

  componentDidMount() {
    if (this.props.applied === false) {
      this.setState({ applied: false, buttonText: "Apply", disable: false });
    } else {
      this.setState({ applied: true, buttonText: "Applied", disable: true });
    }
  }

  async handleApply() {
    this.props.applyJob(this.props.id);
    this.setState({ applied: true, buttonText: "Applied", disable: true });
  }

  render() {
    let { title, companyName, salary, equity } = this.props;

    return (
      <div>
        <div className="JobCard my-3">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{companyName}</p>
            <p className="card-text">Salary: {salary}</p>
            <p className="card-text">Equity: {equity}</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={this.handleApply}
            disabled={this.state.disable}
          >
            {this.state.buttonText}
          </button>
        </div>
      </div>
    );
  }
}
export default JobCard;
