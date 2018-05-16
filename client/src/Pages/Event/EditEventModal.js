import React, { Component } from 'react';
import { formatDateTime } from './../Common/EventHelpers';
import fire from './../../fire';
import Overlay from './../Common/Overlay';
import NameInput from './../EventForm/NameInput';
import TypeInput from './../EventForm/TypeInput';
import PlanningStartInput from './../EventForm/PlanningStartInput';
import EventStartInput from './../EventForm/EventStartInput';
import EventEndInput from './../EventForm/EventEndInput';
import PlanningEndInput from './../EventForm/PlanningEndInput';
import LocationInput from './../EventForm/LocationInput';
import ColorInput from './../EventForm/ColorInput';

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
			showErrors: false,
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

		// Close the modal
		this.props.updateModalVisibility(false);
	}

	changeEventColor = (color) => {
		this.setState({ color: color.hex });
	};

	render() {
        return (
			<Overlay
				id="editEventModal"
				title="Add Event"
				visible={this.props.visible}
				updateModalVisibility={this.props.updateModalVisibility}>
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
						value={this.state.planning_start}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ planning_start: value })} />
					<EventStartInput
						value={this.state.event_start}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ event_start: value })} />
					<EventEndInput
						value={this.state.event_end}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ event_end: value })} />
					<PlanningEndInput 
						value={this.state.planning_end}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ planning_end: value })} />
					<LocationInput
						value={this.state.location}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ location: value })} />
					<ColorInput 
						value={this.state.color}
						onChange={this.changeEventColor} />
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-primary"
						onClick={this.editEvent}>
						Save
					</button>
				</div>
			</Overlay>
		);
	}
}

export default EditEventModal;