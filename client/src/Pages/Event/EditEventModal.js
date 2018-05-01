import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import {
	validPlanningStart,
	validEventStart,
	validEventEnd,
	validPlanningEnd,
	formatDateTime } from './../Common/EventHelpers';
import fire from './../../fire';
import DateTime from "./../../../node_modules/react-datetime/DateTime.js";

class EditEventModal extends Component {
    constructor(props) {
		super(props);

        this.state = {
			id: this.props.id,
			name: "",
			type: "",
			location: "",
			planning_start: "",
			event_start: "",
			event_end: "",
			planning_end: "",
			color: "",
        };

		this.editEvent = this.editEvent.bind(this);
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
				planning_start: event.planning_start,
				event_start: event.event_end,
				event_end: event.event_end,
				planning_end: event.planning_end,
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
		updates['/events/' + self.state.id + '/planning_start'] = formatDateTime(self.state.planning_start);
		updates['/events/' + self.state.id + '/event_start'] = formatDateTime(self.state.event_start);
		updates['/events/' + self.state.id + '/event_end'] = formatDateTime(self.state.event_end);
		updates['/events/' + self.state.id + '/planning_end'] = formatDateTime(self.state.planning_end);
		updates['/events/' + self.state.id + '/color'] = self.state.color;
        fire.database().ref().update(updates);
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
								<label htmlFor="planning-start">Planning Start:</label>
								<DateTime
									name="planning-start"
									value={formatDateTime(this.state.planning_start)}
									onChange={(event) => this.setState({ planning_start: event._d })}
									isValidDate={(current) => validPlanningStart(
										current,
										this.state.event_start,
										this.state.event_end,
										this.state.planning_end,
									)}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="event-start">Event Start:</label>
								<DateTime
									name="event-start"
									value={formatDateTime(this.state.event_start)}
									onChange={(event) => this.setState({ event_start: event._d })}
									isValidDate={(current) => validEventStart(
										this.state.planning_start,
										current,
										this.state.event_end,
										this.state.planning_end,
									)}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="event-end">Event End:</label>
								<DateTime
									name="event-end"
									value={formatDateTime(this.state.event_end)}
									onChange={(event) => this.setState({ event_end: event._d })}
									isValidDate={(current) => validEventEnd(
										this.state.planning_start,
										this.state.event_start,
										current,
										this.state.planning_end,
									)}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="planning-end">Planning End Date:</label>
								<DateTime
									name="planning-end"
									value={formatDateTime(this.state.planning_end)}
									onChange={(event) => this.setState({ planning_end: event._d })}
									isValidDate={(current) => validPlanningEnd(
										this.state.planning_start,
										this.state.event_start,
										this.state.event_end,
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