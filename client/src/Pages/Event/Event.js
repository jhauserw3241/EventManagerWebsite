import React, { Component } from 'react';
import EventComponentTypeCard from './EventComponentTypeCard';
import PartnersComponentCard from './PartnersComponentCard';
import LinkedProjectsComponentCard from './LinkedProjectsComponentCard';
import EditEventModal from './EditEventModal';
import AddComponentModal from './AddComponentModal';
import AddPartnerModal from './AddPartnerModal';
import LinkProjectModal from './LinkProjectModal';
import { formatDateTime } from './../Common/EventHelpers';
import { Button } from 'react-bootstrap';
import fire from './../../fire';
import './../../CSS/Card.css';
import './../../CSS/Event.css';

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_id: this.props.match.params.id,
			event_name: "",
			event_type: "",
			event_location: "",
			project_start: "",
			event_start: "",
			event_end: "",
			project_end: "",
			owner_id: "",
			event_color: "",
			archived: false,
			components: [],
			component_types: [
				{type: "agenda", name: "Agenda(s)"},
				{type: "budget", name: "Budget(s)"},
				{type: "meetingNotes", name: "Meeting Notes"},
				{type: "other", name: "Other"}],
			people: [],
			event_partners: [],
			edit_modal_visible: false,
        };

		this.canEditEvent = this.canEditEvent.bind(this);
		this.updateEditModalVisibility = this.updateEditModalVisibility.bind(this);
    }

    componentDidMount() {
        var self = this;

		// Get information about this event
        fire.database().ref("events").child(self.state.event_id).on("value", function(data) {
            var event = data.val();
            self.setState({
				event_name: event.name,
				event_type: event.type,
				event_location: event.location,
				planning_start: event.planning_start,
				event_start: event.event_start,
				event_end: event.event_end,
				planning_end: event.planning_end,
				owner_id: event.owner_id,
				components: event.components ? Object.values(event.components) : [],
				event_color: event.color,
				archived: event.archived ? event.archived : false,
				partners: event.partners ? event.partners : {},
            });
		});

		this.archiveEvent = this.archiveEvent.bind(this);
	}
	
	canEditEvent() {
		// Check if the current user is logged in
		var user = fire.auth().currentUser;
		if(!user) {
			return false;
		}

		// Check if the user is the event owner
		if(user.uid === this.state.owner_id) {
			return true;
		}

		// Check if the user is a partner with edit privileges
		for(var partner_id in this.state.partners) {
			var partner = this.state.partners[partner_id];
			if(user.uid === partner_id) {
				return (partner.priv === "Edit") || (partner.priv === "Owner");
			}
		}

		return false;
	}

	archiveEvent(archive) {
		var updates = {};
		updates["/events/" + this.state.event_id + "/archived"] = archive;
		fire.database().ref().update(updates);
	}

	updateEditModalVisibility(value) {
		this.setState({ edit_modal_visible: value });
	}

	render() {
		return (
			<div className="Event">
				<EditEventModal
					id={this.state.event_id}
					visible={this.state.edit_modal_visible}
					updateModalVisibility={this.updateEditModalVisibility} />

				<AddComponentModal event_id={this.state.event_id} />

				<AddPartnerModal event_id={this.state.event_id} />

				<LinkProjectModal event_id={this.state.event_id} />

                <div className="container">
                    <div className="content">
						<div
							className="project-mod-btns">
							{(this.state.archived) ?
								<Button 
									className="btn btn-success"
									onClick={() => this.archiveEvent(false)}>
									<i className="fa fa-folder-open"></i>
								</Button>
								: <Button
									className="btn btn-success"
									onClick={() => this.archiveEvent(true)}>
									<i className="fa fa-archive"></i>
								</Button>
							}
						</div>
						
						<div className="event-info">
							<div className="event-header">
								<div className="header-left-buffer"></div>
								<div className="event-base-info">
									<h1>{this.state.event_name}</h1>
									<strong>Location:</strong> {this.state.event_location}<br />
									<strong>Type:</strong> {this.state.event_type}
								</div>
								<div className="event-dates">
									<strong>Planning Start:</strong> {formatDateTime(this.state.planning_start)}<br />
									<strong>Event Start:</strong> {formatDateTime(this.state.event_start)}<br />
									<strong>Event End:</strong> {formatDateTime(this.state.event_end)}<br />
									<strong>Planning End:</strong> {formatDateTime(this.state.planning_end)}
								</div>
							</div>
						</div>
						<div className="list-container">
							{(this.canEditEvent()) ?
								<div className="mod-btns">
									<Button
										className="btn btn-success"
										data-toggle="modal"
										data-target={"#addComponentModal-" + this.props.id}>
										<i className="fa fa-plus"></i> Component
									</Button>
									<Button
										className="btn btn-success"
										data-toggle="modal"
										data-target={"#addPartnerModal-" + this.props.id}>
										<i className="fa fa-plus"></i> Partner
									</Button>
									<Button
										className="btn btn-success"
										data-toggle="modal"
										data-target={"#linkProjectModal-" + this.props.id}>
										<i className="fa fa-link" aria-hidden="true"></i> Project
									</Button>
									<Button
										className="btn btn-warning"
										onClick={() => this.updateEditModalVisibility(true)}>
										<i className="fa fa-edit"></i> Event
									</Button>
								</div> : null }
							{this.state.component_types.map(type =>
								<EventComponentTypeCard
									type={type.type}
									name={type.name}
									event_id={this.state.event_id}
									canEdit={this.canEditEvent} />
							)}
							<PartnersComponentCard
								name="Partners"
								canEditEvent={this.canEditEvent}
								link={"/event/" + this.state.event_id + "/partners/"} />
							<LinkedProjectsComponentCard
								name="Linked Projects"
								canEditEvent={this.canEditEvent}
								link={"/event/" + this.state.event_id + "/linkedprojects/"} />
						</div>
                    </div>
                </div>
			</div>
		);
	}
}

export default Event;