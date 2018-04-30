import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../CSS/Card.css';

class EventCard extends Component {
	render() {
		var cardImgStyle = {
			"backgroundColor": this.props.color
		};

		return (
			<Link className="EventCard side-card" to={"/event/" + this.props.id}>
				<div className="side-card-img" style={cardImgStyle}></div>
				<div className="side-card-text">
					{this.props.name}
				</div>
				<div className="side-card-mod-btns">
					<button
						className="btn btn-danger card-delete-btn"
						onClick={(event) => this.props.deleteEvent(event, this.props.id)} >
						Delete
					</button>
				</div>
			</Link>
		);
	}
}

export default EventCard;
