import React, { Component } from 'react';
import AgencyTags from './../Common/PersonAgencyTags';

class AgenciesInput extends Component {
	render() {
        return (
            <div className="form-group">
                <label htmlFor="agencies">Agencies:</label>
                <AgencyTags
                    tags={this.props.tags}
                    shouldStore={false}
                    handleDelete={this.props.handleDelete}
                    handleAddition={this.props.handleAddition}
                    handleDrag={this.props.handleDrag}
                    handleTagClick={this.props.handleTagClick} />
            </div>
        );
	}
}

export default AgenciesInput;
