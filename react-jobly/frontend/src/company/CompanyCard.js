import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CompanyCard extends Component {

    render() {
        let { handle, name, description } = this.props;
        let companyPage = `/companies/${handle}`;
        return (
            <div>
                <div className="companyCard my-3">
                    <Link to={companyPage}>
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{description}</p>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}
export default CompanyCard;
