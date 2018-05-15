import React, { Component } from 'react';
import AgencyPeopleTags from './../Common/AgencyPeopleTags';

class PeopleInput extends Component {
	render() {
		return (
            <div className="form-group">
                <label htmlFor="people">Associated People:</label>
                <AgencyPeopleTags
                    id={this.props.id}
                    readOnly={true} />
            </div>
		);
	}
}

export default PeopleInput;
