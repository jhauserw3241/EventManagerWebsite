import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../CSS/Card.css';

class EventElement extends Component {
	render() {
		return (
			<Link className="EventElement card" to={"/event/" + this.props.id}>
				{this.props.name}<br />
				{this.props.type}<br />
				{this.props.completed_date}
			</Link>
		);
	}
}

export default EventElement;
