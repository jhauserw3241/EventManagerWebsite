import React, { Component } from 'react';
import AgencyTags from './PersonAgencyTags';

class AgenciesInput extends Component {
	render() {
        return (
            <div className="form-group">
                <label htmlFor="agencies">Agencies:</label>
                <AgencyTags
                    id={this.props.id}
                    tags={this.props.tags}
                    shouldStore={this.props.tags ? false : true}
                    handleDelete={this.props.handleDelete}
                    handleAddition={this.props.handleAddition}
                    handleDrag={this.props.handleDrag}
                    handleTagClick={this.props.handleTagClick}
                    onError={this.props.onError}
                    readOnly={this.props.disabled ? this.props.disabled : false} />
            </div>
        );
	}
}

export default AgenciesInput;
