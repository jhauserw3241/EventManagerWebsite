import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import EventComponentCard from './EventComponentCard';
import PartnersComponentCard from './PartnersComponentCard';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import fire from './../../fire';

// CSS and JS for datetime picker
import moment from './../../../node_modules/moment/moment';
import "./../../../node_modules/react-datetime/css/react-datetime.css";
import DateTime from "./../../../node_modules/react-datetime/DateTime.js";

class EditEventModal extends Component {
    constructor(props) {
		super(props);

        this.state = {
			id: this.props.id,
			name: "",
			type: "",
			location: "",
			project_start: "",
			event_start: "",
			event_end: "",
			project_end: "",
			color: "",
        };

		this.editEvent = this.editEvent.bind(this);
		this.validProjectStart = this.validProjectStart.bind(this);
		this.validEventStart = this.validEventStart.bind(this);
		this.validEventEnd = this.validEventEnd.bind(this);
		this.validProjectEnd = this.validProjectEnd.bind(this);
		this.formatDateTime = this.formatDateTime.bind(this);
		this.changeEventColor = this.changeEventColor.bind(this);
	}
	
	componentDidMount() {
		var self = this;

		// Get current event object
		fire.database().ref("events").child(this.state.id).once("value", function(data) {
			var event = data.val() ? data.val() : {};
			self.setState({
				name: event.name,
				type: event.type,
				location: event.location,
				project_start: event.project_start,
				event_start: event.event_end,
				event_end: event.event_end,
				project_end: event.project_end,
				color: event.color,	
			});
		});
	}
	
	editEvent(event) {
		event.preventDefault();

		var self = this;

		// Edit event component
		var updates = {};
		updates['/events/' + self.state.id + '/name'] = self.state.name;
		updates['/events/' + self.state.id + '/type'] = self.state.type;
		updates['/events/' + self.state.id + '/location'] = self.state.location;
		updates['/events/' + self.state.id + '/project_start'] = this.formatDateTime(self.state.project_start);
		updates['/events/' + self.state.id + '/event_start'] = this.formatDateTime(self.state.event_start);
		updates['/events/' + self.state.id + '/event_end'] = this.formatDateTime(self.state.event_end);
		updates['/events/' + self.state.id + '/project_end'] = this.formatDateTime(self.state.project_end);
		updates['/events/' + self.state.id + '/color'] = self.state.color;
        fire.database().ref().update(updates);
	}

	validProjectStart(current) {
		// Check that the project start is before the event start
		if(	(this.state.event_start !== "") &&
			current.isAfter(this.state.event_start)) {
			return false;
		}

		// Check that the project start is before the event end
		if(	(this.state.event_end !== "") &&
			current.isAfter(this.state.event_end)) {
			return false;
		}

		// Check that the project start is before the project end
		if(	(this.state.project_end !== "") &&
			current.isAfter(this.state.project_end)) {
			return false;
		}

		return true;
	}

	validEventStart(current) {
		// Check that the event start is after the project start
		if(	(this.state.project_start !== "") &&
			current.isBefore(this.state.project_start)) {
			return false;
		}

		// Check that the event start is before the event end
		if(	(this.state.event_end !== "") &&
			current.isAfter(this.state.event_end)) {
			return false;
		}

		// Check that the event start is before the project end
		if(	(this.state.project_end !== "") &&
			current.isAfter(this.state.project_end)) {
			return false;
		}

		return true;
	}

	validEventEnd(current) {
		// Check that the event end is after the project start
		if(	(this.state.project_start !== "") &&
			current.isBefore(this.state.project_start)) {
			return false;
		}

		// Check that the event end is after the event start
		if(	(this.state.event_start !== "") &&
			current.isBefore(this.state.event_start)) {
			return false;
		}

		// Check that the event end is before the project end
		if(	(this.state.project_end !== "") &&
			current.isAfter(this.state.project_end)) {
			return false;
		}

		return true;
	}

	validProjectEnd(current) {
		// Check that the project end is after the project start
		if(	(this.state.project_start !== "") &&
			current.isBefore(this.state.project_start)) {
			return false;
		}

		// Check that the project end is after the event start
		if(	(this.state.event_start !== "") &&
			current.isBefore(this.state.event_start)) {
			return false;
		}

		// Check that the project end is after the event end
		if(	(this.state.event_end !== "") &&
			current.isBefore(this.state.event_end)) {
			return false;
		}

		return true;
	}

	formatDateTime(momentObj) {
		return moment(momentObj).format('MMMM DD, YYYY HH:mm');
	}

	changeEventColor = (color) => {
	  this.setState({ color: color.hex });
	};

	render() {
        return (
			<div
				className="modal fade"
				id="editEventModal"
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
				aria-labelledby="editEventModalTitle"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="editEventModalTitle">Add Event</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="name">Name:</label>
								<input
									type="text"
									name="name"
									className="form-control"
									value={this.state.name}
									onChange={(event) => this.setState({ name: event.target.value })}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="type">Type:</label>
								<select
									name="type"
									className="form-control"
									value={this.state.type}
									onChange={(event) => this.setState({ type: event.target.value })}
									required>
									<option>Not Specified</option>
									<option>Conference</option>
									<option>Field trip</option>
									<option>Training</option>
									<option>Site Visit</option>
									<option>Miscellaneous</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="project-start">Project Start Date:</label>
								<DateTime
									name="project-start"
									value={this.formatDateTime(this.state.project_start)}
									onChange={(event) => this.setState({ project_start: event._d })}
									isValidDate={this.validProjectStart}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="event-start">Event Start Date:</label>
								<DateTime
									name="event-start"
									value={this.formatDateTime(this.state.event_start)}
									onChange={(event) => this.setState({ event_start: event._d })}
									isValidDate={this.validEventStart}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="event-end">Event End Date:</label>
								<DateTime
									name="event-end"
									value={this.formatDateTime(this.state.event_end)}
									onChange={(event) => this.setState({ event_end: event._d })}
									isValidDate={this.validEventEnd}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="project-end">Project End Date:</label>
								<DateTime
									name="project-end"
									value={this.formatDateTime(this.state.project_end)}
									onChange={(event) => this.setState({ project_end: event._d })}
									isValidDate={this.validProjectEnd}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="location">Location:</label>
								<input
									type="text"
									name="location"
									className="form-control"
									value={this.state.location}
									onChange={(event) => this.setState({ location: event.target.value })}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="color">Color:</label>
								<SketchPicker
									color={this.state.color}
									onChangeComplete={ this.changeEventColor } />
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
								data-dismiss="modal"
								onClick={this.editEvent}>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EditEventModal;