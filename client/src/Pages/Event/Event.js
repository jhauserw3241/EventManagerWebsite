import React, { Component } from 'react';
import EventComponentCard from './EventComponentCard';
import PartnersComponentCard from './PartnersComponentCard';
import EditEventModal from './EditEventModal';
import AddComponentModal from './AddComponentModal';
import AddPartnerModal from './AddPartnerModal';
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
			components: [],
			people: [],
			event_partners: [],
        };

		this.canEditEvent = this.canEditEvent.bind(this);
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
				partners: event.partners ? event.partners : {},
            });
		});
	}
	
	canEditEvent() {
		if(!fire.auth().currentUser) {
			return false;
		}

		var cur_user_id = fire.auth().currentUser.uid;

		// Check if the user is the event owner
		if(cur_user_id === this.state.owner_id) {
			return true;
		}

		// Check if the user is a partner with edit privileges
		for(var partner_id in this.state.partners) {
			var partner = this.state.partners[partner_id];
			if(cur_user_id === partner_id) {
				return (partner.priv === "Edit") || (partner.priv === "Owner");
			}
		}

		return false;
	}

	render() {
        return (
			<div className="Event">
				<EditEventModal id={this.state.event_id} />

				<AddComponentModal event_id={this.state.event_id} />

				<AddPartnerModal event_id={this.state.event_id} />

                <div className="container">
                    <div className="content">
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
										className="btn btn-warning"
										data-toggle="modal"
										data-target={"#editEventModal"}>
										<i className="fa fa-edit"></i> Event
									</Button>
								</div> : null }
							{this.state.components.map(comp =>
								<EventComponentCard
									color={comp.color}
									name={comp.name}
									event_id={this.state.event_id}
									component_id={comp.id}
									canEditEvent={this.canEditEvent}
									link={"/event/" + this.state.event_id + "/components/" + comp.id + "/"} />
							)}
							<PartnersComponentCard
								color="red"
								name="Partners"
								canEditEvent={this.canEditEvent}
								link={"/event/" + this.state.event_id + "/partners/"} />
						</div>
                    </div>
                </div>
			</div>
		);
	}
}

export default Event;