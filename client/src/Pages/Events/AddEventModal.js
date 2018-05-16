import React, { Component } from 'react';
import { generateColor } from './../Common/Colors';
import {
	validPlanningStart,
	validEventStart,
	validEventEnd,
	validPlanningEnd,
	formatDateTime } from './../Common/EventHelpers';
import { isEmptyString } from './../Common/FormValidation';
import fire from './../../fire';
import Overlay from './../Common/Overlay';
import NameInput from './../EventForm/NameInput';
import TypeInput from './../EventForm/TypeInput';
import PlanningStartInput from './../EventForm/PlanningStartInput';
import EventStartInput from './../EventForm/EventStartInput';
import EventEndInput from './../EventForm/EventEndInput';
import PlanningEndInput from './../EventForm/PlanningEndInput';
import LocationInput from './../EventForm/LocationInput';

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
			showErrors: false,
		};

		this.isFormValid = this.isFormValid.bind(this);
		this.addEvent = this.addEvent.bind(this);
	}

	isFormValid() {
		// Check if the name is an empty string
		if(isEmptyString(this.state.name)) {
			return false;
		}

		// Check if the type is an empty string
		if(isEmptyString(this.state.type)) {
			return false;
		}

		// Check if the location is an empty string
		if(isEmptyString(this.state.location)) {
			return false;
		}

		// Check if the planning start is an empty string
		if(isEmptyString(this.state.planningStart)) {
			return false;
		}

		// Check if the name is an empty string
		if(isEmptyString(this.state.eventStart)) {
			return false;
		}

		// Check if the type is an empty string
		if(isEmptyString(this.state.eventEnd)) {
			return false;
		}

		// Check if the name is an empty string
		if(isEmptyString(this.state.planningEnd)) {
			return false;
		}

		return true;
	}

	addEvent(event) {
		event.preventDefault();

		var self = this;

		// Check if the user is logged in
		var owner = fire.auth().currentUser;
		if(!owner) {
			return;
		}

		// Check if the form is valid
		if(!this.isFormValid()) {
			this.setState({ showErrors: true });
			return;
		}

		fire.database().ref("users").child(owner.uid).once("value", function(data) {
			var user = data.val();
			var user_name = user.first_name + " " + user.last_name;

			var partnersList = {};
			partnersList[owner.uid] = {
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
				owner_id: owner.uid,
				partners: partnersList,
				color: generateColor(),
			}).then(function() {
				self.setState({
					name: "",
					type: "",
					location: "",
					planning_start: moment(),
					event_start: moment(),
					event_end: moment(),
					planning_end: moment(),
				});
			});

			// Add this event to the list of events that is being tracked for the current user
			var updates = {};
			updates['/users/' + owner.uid + '/events/' + event_id] = event_id;
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

		// Close the modal
		this.props.updateAddModalVisibility(false);
	}
	
	render() {
		return (
			<Overlay
				id="addEventModal"
				title="Add Event"
				visible={this.props.visible}
				updateModalVisibility={this.props.updateAddModalVisibility}>
				<div className="modal-body">
					<NameInput
						value={this.state.name}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ name: value })} />
					<TypeInput
						value={this.state.type}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ type: value })} />
					<PlanningStartInput
						value={this.state.planningStart}
						eventStart={this.state.eventStart}
						eventEnd={this.state.eventEnd}
						planningEnd={this.state.planningEnd}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ planningStart: value })} />
					<EventStartInput
						value={this.state.eventStart}
						planningStart={this.state.planningStart}
						eventEnd={this.state.eventEnd}
						planningEnd={this.state.planningEnd}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ eventStart: value })} />
					<EventEndInput
						value={this.state.eventEnd}
						planningStart={this.state.planningStart}
						eventStart={this.state.eventStart}
						planningEnd={this.state.planningEnd}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ eventEnd: value })} />
					<PlanningEndInput
						value={this.state.planningEnd}
						planningStart={this.state.planningStart}
						eventStart={this.state.eventStart}
						eventEnd={this.state.eventEnd}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ planningEnd: value })} />
					<LocationInput
						value={this.state.location}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ location: value })} />
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-primary"
						onClick={this.addEvent}>
						Submit
					</button>
				</div>
			</Overlay>
		);
	}
}

export default AddEventModal;
