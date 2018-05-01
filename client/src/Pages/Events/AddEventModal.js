import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Modal.css';

// CSS and JS for datetime picker
import moment from './../../../node_modules/moment/moment';
import "./../../../node_modules/react-datetime/css/react-datetime.css";
import DateTime from "./../../../node_modules/react-datetime/DateTime.js";

class AddEventModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			type: "",
			location: "",
			projectStart: "",
			projectEnd: "",
			eventStart: "",
			eventEnd: "",
		};

		this.addEvent = this.addEvent.bind(this);
		this.validProjectStart = this.validProjectStart.bind(this);
		this.validEventStart = this.validEventStart.bind(this);
		this.validEventEnd = this.validEventEnd.bind(this);
		this.validProjectEnd = this.validProjectEnd.bind(this);
	}

	addEvent(event) {
		event.preventDefault();

		var self = this;

		var owner_id = fire.auth().currentUser.uid;
		fire.database().ref("users").child(owner_id).once("value", function(data) {
			var user = data.val();
			var user_name = user.first_name + " " + user.last_name;

			var partnersList = {};
			partnersList[owner_id] = {
				name: user_name,
				role: "Owner",
				priv: "Owner",
			}

			// Create event
			var curEventRef = fire.database().ref("events").push();
			var event_id = curEventRef.path["pieces_"][1];
			curEventRef.set({
				id: event_id,
				name: self.state.name,
				type: self.state.type,
				location: self.state.location,
				project_start: moment(self.state.projectStart).format('MMMM DD, YYYY HH:mm'),
				project_end: moment(self.state.eventStart).format('MMMM DD, YYYY HH:mm'),
				event_start: moment(self.state.eventEnd).format('MMMM DD, YYYY HH:mm'),
				event_end: moment(self.state.projectEnd).format('MMMM DD, YYYY HH:mm'),
				owner_id: owner_id,
				partners: partnersList,
				color: "#"+((1<<24)*Math.random()|0).toString(16), // Generate random color
			}).catch(function(error) {
				this.setState({ formError: error.code + ": " + error.message });
			});


			// Add this event to the list of events that is being tracked for the current user
			var updates = {};
			updates['/users/' + owner_id + '/events/' + event_id] = event_id;
			fire.database().ref().update(updates);

			// Create default agenda for the event
			var curEventAgendas = curEventRef.child("components").push();
			var agenda_id = curEventAgendas.path["pieces_"][3];
			curEventAgendas.set({
				id: agenda_id,
				component_type: "Agenda",
				name: "Agenda",
				content_type: "url",
				path: "",
				url: "https://www.google.com",
				color: "#"+((1<<24)*Math.random()|0).toString(16), // Generate random color
			}).catch(function(error) {
				this.setState({ formError: error.code + ": " + error.message });
			});

			// Create default budget for the event
			var curEventBudgets = curEventRef.child("components").push();
			var budget_id = curEventBudgets.path["pieces_"][3];
			curEventBudgets.set({
				id: budget_id,
				component_type: "Budget",
				name: "Budget",
				content_type: "url",
				path: "",
				url: "https://www.stackoverflow.com",
				color: "#"+((1<<24)*Math.random()|0).toString(16), // Generate random color
			}).catch(function(error) {
				this.setState({ formError: error.code + ": " + error.message });
			});
		});
	}

	validProjectStart(current) {
		var valid = true;

		// Check that the project start is before the event start
		if(	(this.state.eventStart !== "") &&
			current.isAfter(this.state.eventStart)) {
			valid = false;
		}

		// Check that the project start is before the event end
		if(	(this.state.eventEnd !== "") &&
			current.isAfter(this.state.eventEnd)) {
			valid = false;
		}

		// Check that the project start is before the project end
		if(	(this.state.projectEnd !== "") &&
			current.isAfter(this.state.projectEnd)) {
			valid = false;
		}

		return valid;
	}

	validEventStart(current) {
		var valid = true;

		// Check that the event start is after the project start
		if(	(this.state.projectStart !== "") &&
			current.isBefore(this.state.projectStart)) {
			valid = false;
		}

		// Check that the event start is before the event end
		if(	(this.state.eventEnd !== "") &&
			current.isAfter(this.state.eventEnd)) {
			valid = false;
		}

		// Check that the event start is before the project end
		if(	(this.state.projectEnd !== "") &&
			current.isAfter(this.state.projectEnd)) {
			valid = false;
		}

		return valid;
	}

	validEventEnd(current) {
		var valid = true;

		// Check that the event end is after the project start
		if(	(this.state.projectStart !== "") &&
			current.isBefore(this.state.projectStart)) {
			valid = false;
		}

		// Check that the event end is after the event start
		if(	(this.state.eventStart !== "") &&
			current.isBefore(this.state.eventStart)) {
			valid = false;
		}

		// Check that the event end is before the project end
		if(	(this.state.projectEnd !== "") &&
			current.isAfter(this.state.projectEnd)) {
			valid = false;
		}

		return valid;
	}

	validProjectEnd(current) {
		var valid = true;

		// Check that the project end is after the project start
		if(	(this.state.projectStart !== "") &&
			current.isBefore(this.state.projectStart)) {
			valid = false;
		}

		// Check that the project end is after the event start
		if(	(this.state.eventStart !== "") &&
			current.isBefore(this.state.eventStart)) {
			valid = false;
		}

		// Check that the project end is after the event end
		if(	(this.state.eventEnd !== "") &&
			current.isBefore(this.state.eventEnd)) {
			valid = false;
		}

		return valid;
	}
	
	render() {
		return (
			<div
				className="modal fade"
				id="addEventModal"
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
				aria-labelledby="addEventModalTitle"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addEventModalTitle">Add Event</h5>
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
									onChange={(event) => this.setState({name: event.target.value})}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="type">Type:</label>
								<select
									name="type"
									className="form-control"
									onChange={(event) => this.setState({type: event.target.value})}
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
									onChange={(event) => this.setState({projectStart: event._d})}
									isValidDate={this.validProjectStart}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="event-start">Event Start Date:</label>
								<DateTime
									name="event-start"
									onChange={(event) => this.setState({eventStart: event._d})}
									isValidDate={this.validEventStart}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="event-end">Event End Date:</label>
								<DateTime
									name="event-end"
									onChange={(event) => this.setState({eventEnd: event._d})}
									isValidDate={this.validEventEnd}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="project-end">Project End Date:</label>
								<DateTime
									name="project-end"
									onChange={(event) => this.setState({projectEnd: event._d})}
									isValidDate={this.validProjectEnd}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="location">Location:</label>
								<input
									type="text"
									name="location"
									className="form-control"
									onChange={(event) => this.setState({location: event.target.value})}
									required />
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
								data-dismiss="modal"
								onClick={this.addEvent}>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddEventModal;
