import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventComponentTypeModal from './../EventComponentTypeModal/EventComponentTypeModal';
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
		console.log("test");

		console.log(this.props.component_id);

		return (
			<div
				className="EventComponentCard side-card"
				data-target={"#eventComponentModal-" + this.props.component_id}
				data-dismiss="modal">
				<EventComponentTypeModal
					event_id={this.props.event_id}
					component_type="agenda" />
				<div className="side-card-img" style={cardImgStyle}></div>
				<div className="side-card-text">
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default EventComponentCard;
