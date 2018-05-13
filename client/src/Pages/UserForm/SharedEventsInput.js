import React, { Component } from 'react';
import EventTags from './../UserForm/PersonEventTags';
import './../../CSS/Card.css';

class SharedEventsInput extends Component {
	render() {
		return (
            <div className="form-group">
                <label htmlFor="events">Shared Events:</label>
                <EventTags
                    id={this.props.id}
                    onError={this.props.onError}
                    readOnly={this.props.disabled} />
            </div>
		);
	}
}

export default SharedEventsInput;
