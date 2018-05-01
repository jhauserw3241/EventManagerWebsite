import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Card.css';

class EventComponentCard extends Component {
	constructor(props) {
		super(props);

		this.deleteComponent = this.deleteComponent.bind(this);
	}

	deleteComponent(event) {
		event.preventDefault();

		// Create event
		fire.database().ref("events").child(this.props.event_id).child("components").child(this.props.component_id).remove();
	}

	render() {
		var cardImgStyle = {
			"backgroundColor": this.props.color
		};

		return (
			<Link className="EventComponentCard side-card" to={this.props.link}>
				<div className="side-card-img" style={cardImgStyle}></div>
				<div className="side-card-text">
					{this.props.name}
				</div>
				{(this.props.canEditEvent()) ?
					<div className="side-card-btns">
						<button
							className="btn btn-danger card-delete-btn"
							onClick={this.deleteComponent}>
							Delete
						</button>
					</div> : null }
			</Link>
		);
	}
}

export default EventComponentCard;
