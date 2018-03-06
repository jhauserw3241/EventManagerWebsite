import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../CSS/Card.css';

class EventCard extends Component {
	render() {
		var cardImgStyle = {
			"backgroundColor": this.props.color
		};

		return (
			<Link className="EventCard card" to={"/event/" + this.props.id}>
				<div className="card-img" style={cardImgStyle}></div>
				<div className="card-text">
					{this.props.name}
				</div>
			</Link>
		);
	}
}

export default EventCard;
