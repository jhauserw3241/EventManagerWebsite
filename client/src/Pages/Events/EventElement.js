import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../CSS/Card.css';

class EventElement extends Component {s
	render() {
		if(this.props.org === "cards") {
			return (
				<Link className="EventElement card" to={"/event/" + this.props.id}>
					{this.props.name}<br />
					{this.props.type}<br />
					{this.props.completed_date}
				</Link>
			);
		} else if(this.props.org === "list") {
			return (
				<Link className="EventElement" to={"/event/" + this.props.id}>
					{this.props.name}
					{this.props.type}
					{this.props.completed_date}
				</Link>
			);
		} else {
			return null;
		}
	}
}

export default EventElement;
