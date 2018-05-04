import React, { Component } from 'react';
import { generateColor } from './../Common/Colors';
import {
	validPlanningStart,
	validEventStart,
	validEventEnd,
	validPlanningEnd,
	formatDateTime } from './../Common/EventHelpers';
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
			planningStart: "",
			planningEnd: "",
			eventStart: "",
			eventEnd: "",
		};

		this.addEvent = this.addEvent.bind(this);
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
				planning_start: formatDateTime(self.state.planningStart),
				event_start: formatDateTime(self.state.eventStart),
				event_end: formatDateTime(self.state.eventEnd),
				planning_end: formatDateTime(self.state.planningEnd),
				owner_id: owner_id,
				partners: partnersList,
				color: generateColor(),
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
				component_type: "agenda",
				name: "Agenda",
				content_type: "url",
				path: "",
				url: "https://docs.google.com/document/d/177zKPSfU3ViFQjlq7xCucb32wq60uAaLisoXhZuGiWQ/edit",
				color: generateColor(),
			}).catch(function(error) {
				this.setState({ formError: error.code + ": " + error.message });
			});

			// Create default budget for the event
			var curEventBudgets = curEventRef.child("components").push();
			var budget_id = curEventBudgets.path["pieces_"][3];
			curEventBudgets.set({
				id: budget_id,
				component_type: "budget",
				name: "Budget",
				content_type: "url",
				path: "",
				url: "http://www.ksu.edu",
				color: generateColor(),
			}).catch(function(error) {
				this.setState({ formError: error.code + ": " + error.message });
			});
		});
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
								<label htmlFor="planning-start">Planning Start:</label>
								<DateTime
									name="planning-start"
									onChange={(event) => this.setState({planningStart: event._d})}
									isValidDate={(current) => validPlanningStart(
										current,
										this.state.eventStart,
										this.state.eventEnd,
										this.state.planningEnd,
									)}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="event-start">Event Start:</label>
								<DateTime
									name="event-start"
									onChange={(event) => this.setState({eventStart: event._d})}
									isValidDate={(current) => validEventStart(
										this.state.planningStart,
										current,
										this.state.eventEnd,
										this.state.planningEnd,
									)}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="event-end">Event End:</label>
								<DateTime
									name="event-end"
									onChange={(event) => this.setState({eventEnd: event._d})}
									isValidDate={(current) => validEventEnd(
										this.state.planningStart,
										this.state.eventStart,
										current,
										this.state.planningEnd,
									)}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="planning-end">Planning End:</label>
								<DateTime
									name="planning-end"
									onChange={(event) => this.setState({planningEnd: event._d})}
									isValidDate={(current) => validPlanningEnd(
										this.state.planningStart,
										this.state.eventStart,
										this.state.eventEnd,
										current,
									)}
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
