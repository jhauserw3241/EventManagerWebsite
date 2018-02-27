import React, { Component } from 'react';
import './../../CSS/Card.css';

class Event extends Component {
	render() {	
		return (
			<div className="Event card">
				{this.props.name}<br />
				{this.props.type}<br />
				{this.props.completed_date}
			</div>
		);
	}
}

export default Event;
