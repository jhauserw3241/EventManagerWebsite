import React, { Component } from 'react';
import EventComponentCard from './EventComponentCard';
import PartnersComponentCard from './PartnersComponentCard';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import fire from './../../fire';
import './../../CSS/Card.css';
import './../../CSS/Event.css';
import PartnerComponent from '../PartnerComponent/PartnerComponent';
import { POINT_CONVERSION_HYBRID } from 'constants';

// CSS and JS for datetime picker
import moment from './../../../node_modules/moment/moment';
import "./../../../node_modules/react-datetime/css/react-datetime.css";
import DateTime from "./../../../node_modules/react-datetime/DateTime.js";

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_id: this.props.match.params.id,
			event_name: "",
			updated_event_name: "",
			event_type: "",
			updated_event_type: "",
			event_location: "",
			updated_event_location: "",
			project_start: "",
			updated_project_start: "",
			event_start: "",
			updated_project_start: "",
			event_end: "",
			updated_event_end: "",
			project_end: "",
			updated_project_end: "",
			owner_id: "",
			event_color: "",
			components: [],
			component_type: "",
			component_name: "",
			content_type: "",
			component_file: "",
			component_url: "",
			people: [],
			event_partners: [],
			updated_event_partners: [],
        };

		this.canEditEvent = this.canEditEvent.bind(this);
		this.editEvent = this.editEvent.bind(this);
		this.validProjectStart = this.validProjectStart.bind(this);
		this.validEventStart = this.validEventStart.bind(this);
		this.validEventEnd = this.validEventEnd.bind(this);
		this.validProjectEnd = this.validProjectEnd.bind(this);
		this.addComponent = this.addComponent.bind(this);
		this.createSelectItems = this.createSelectItems.bind(this);
		this.onDropdownSelected = this.onDropdownSelected.bind(this);
		this.addPartners = this.addPartners.bind(this);
		this.handlePic = this.handlePic.bind(this);
    }

    componentDidMount() {
        var self = this;

		// Get information about this event
        fire.database().ref("events").child(self.state.event_id).on("value", function(data) {
            var event = data.val();
            self.setState({
				event_name: event.name,
				updated_event_name: event.name,
				event_type: event.type,
				updated_event_type: event.type,
				event_location: event.location,
				updated_event_location: event.location,
				project_start: event.project_start,
				updated_project_start: event.project_start,
				event_start: event.event_start,
				updated_event_start: event.event_start,
				event_end: event.event_end,
				updated_event_end: event.event_end,
				project_end: event.project_end,
				updated_project_end: event.project_end,
				owner_id: event.owner_id,
				components: event.components ? Object.values(event.components) : [],
				event_color: event.color,
				partners: event.partners ? event.partners : {},
				updated_event_partners: event.partners ? event.partners : {},
            });
		});

		// Get list of all people
		var peopleRef = fire.database().ref("users");
		peopleRef.on("value", (data) =>
			this.setState({ people: data.val() ? data.val() : [] }));
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
	
	editEvent(event) {
		event.preventDefault();

		var self = this;

		// Edit event component
        var updates = {};
        updates['/events/' + self.state.event_id] = {
            id: self.state.event_id,
			name: self.state.updated_event_name,
			type: self.state.updated_event_type,
			location: self.state.updated_event_location,
			project_start: moment(self.state.updated_project_start).format('MMMM DD, YYYY HH:mm'),
			project_end: moment(self.state.updated_event_start).format('MMMM DD, YYYY HH:mm'),
			event_start: moment(self.state.updated_event_end).format('MMMM DD, YYYY HH:mm'),
			event_end: moment(self.state.updated_project_end).format('MMMM DD, YYYY HH:mm'),
			owner_id: self.state.owner_id,
			components: self.state.components,
			color: self.state.event_color,
        };
        fire.database().ref().update(updates);
	}

	validProjectStart(current) {
		console.log(current);
		console.log(this.state.updated_event_start);
		console.log(this.state.updated_event_end);
		console.log(this.state.updated_project_end);

		// Check that the project start is before the event start
		if(	(this.state.updated_event_start !== "") &&
			current.isAfter(this.state.updated_event_start)) {
			return false;
		}

		// Check that the project start is before the event end
		if(	(this.state.updated_event_end !== "") &&
			current.isAfter(this.state.updated_event_end)) {
			return false;
		}

		// Check that the project start is before the project end
		if(	(this.state.updated_project_end !== "") &&
			current.isAfter(this.state.updated_project_end)) {
			return false;
		}

		return true;
	}

	validEventStart(current) {
		// Check that the event start is after the project start
		if(	(this.state.updated_project_start !== "") &&
			current.isBefore(this.state.updated_project_start)) {
			return false;
		}

		// Check that the event start is before the event end
		if(	(this.state.updated_event_end !== "") &&
			current.isAfter(this.state.updated_event_end)) {
			return false;
		}

		// Check that the event start is before the project end
		if(	(this.state.updated_project_end !== "") &&
			current.isAfter(this.state.updated_project_end)) {
			return false;
		}

		return true;
	}

	validEventEnd(current) {
		// Check that the event end is after the project start
		if(	(this.state.updated_project_start !== "") &&
			current.isBefore(this.state.updated_project_start)) {
			return false;
		}

		// Check that the event end is after the event start
		if(	(this.state.updated_event_start !== "") &&
			current.isBefore(this.state.updated_event_start)) {
			return false;
		}

		// Check that the event end is before the project end
		if(	(this.state.updated_project_end !== "") &&
			current.isAfter(this.state.updated_project_end)) {
			return false;
		}

		return true;
	}

	validProjectEnd(current) {
		// Check that the project end is after the project start
		if(	(this.state.updated_project_start !== "") &&
			current.isBefore(this.state.updated_project_start)) {
			return false;
		}

		// Check that the project end is after the event start
		if(	(this.state.updated_event_start !== "") &&
			current.isBefore(this.state.updated_event_start)) {
			return false;
		}

		// Check that the project end is after the event end
		if(	(this.state.updated_event_end !== "") &&
			current.isBefore(this.state.updated_event_end)) {
			return false;
		}

		return true;
	}

    addComponent(event) {
        event.preventDefault();

		var self = this;

		// Create event
		var curCompenentRef = fire.database().ref("events").child(self.state.event_id).child("components").push();
		var component_id = curCompenentRef.path["pieces_"][3];
		curCompenentRef.set({
            id: component_id,
            component_type: this.state.component_type,
			name: this.state.component_name,
			content_type: this.state.content_type,
            file: this.state.component_file ? this.state.component_file : "",
            url: this.state.component_url ? this.state.component_url : "",
			color: "#"+((1<<24)*Math.random()|0).toString(16), // Generate random color
		})
		.then(function() {
			// Reset event component fields to be the defaults
			self.setState({
				component_type: "",
				component_name: "",
				content_type: "",
				component_file: "",
				component_url: "",
			});
		})
		.catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
		});
	}
	
	createSelectItems() {
		var items = [];
		var options_count = 0;
		for (var person_id in this.state.people) {
			var person = this.state.people[person_id];
			items.push(
				<option
					key={options_count}
					value={person_id}
					// Check if the person is already added to the event
					disabled={
						(person_id == this.state.owner_id) ||
						(Object.keys(this.state.event_partners).indexOf(person_id) > -1)
					}>
					{person.first_name + " " + person.last_name}
				</option>);

			options_count += 1;
		}
		return items;
	}  
   
	onDropdownSelected(event) {
		var person_id = event.target.value;

		// Check if person is already added as partner
		if(Object.keys(this.state.event_partners).indexOf(person_id) <= -1) {
			// Get person information
			var person = this.state.people[person_id];
			var person_name = person.first_name + " " + person.last_name;

			// Add person to list of partners
			var temp = this.state.updated_event_partners;
			temp[person_id] = {
				name: person_name,
				role: "Contributor",
				priv: "View",
			};
			this.setState({ updated_event_partners: temp });
		}
	}

	addPartners() {
		// Update curriculum information
        var updates = {};
        updates['/events/' + this.state.event_id + "/partners/"] = this.state.updated_event_partners;
         fire.database().ref().update(updates);
	}

    handlePic(event) {
        event.preventDefault();
        var self = this;

        var file = event.target.files[0];
        var ref = fire.storage().ref('Component Files').child(file.name);        
        ref.put(file).then(()=>{
            ref.getDownloadURL().then((url) => {
                self.setState({component_file: url});
            }).catch((err) => {
                self.setState({ formError: err.code + ": " + err.message });
            });
        }).catch((error) => {
            self.setState({ formError: error.code + ": " + error.message });
        });
    }

	render() {
        return (
			<div className="Event">
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
										value={this.state.updated_event_name}
										onChange={(event) => this.setState({updated_event_name: event.target.value})}
										required />
								</div>
								<div className="form-group">
									<label htmlFor="type">Type:</label>
									<select
										name="type"
										className="form-control"
										value={this.state.updated_event_type}
										onChange={(event) => this.setState({updated_event_type: event.target.value})}
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
										value={this.state.updated_project_start}
										onChange={(event) => this.setState({updated_project_start: event._d})}
										isValidDate={this.validProjectStart}
										required />
								</div>
								<div className="form-group">
									<label htmlFor="event-start">Event Start Date:</label>
									<DateTime
										name="event-start"
										value={this.state.updated_event_start}
										onChange={(event) => this.setState({updated_event_start: event._d})}
										isValidDate={this.validEventStart}
										required />
								</div>
								<div className="form-group">
									<label htmlFor="event-end">Event End Date:</label>
									<DateTime
										name="event-end"
										value={this.state.updated_event_end}
										onChange={(event) => this.setState({updated_event_end: event._d})}
										isValidDate={this.validEventEnd}
										required />
								</div>
								<div className="form-group">
									<label htmlFor="project-end">Project End Date:</label>
									<DateTime
										name="project-end"
										value={this.state.updated_project_end}
										onChange={(event) => this.setState({updated_project_end: event._d})}
										isValidDate={this.validProjectEnd}
										required />
								</div>
								<div className="form-group">
									<label htmlFor="location">Location:</label>
									<input
										type="text"
										name="location"
										className="form-control"
										value={this.state.updated_event_location}
										onChange={(event) => this.setState({updated_event_location: event.target.value})}
										required />
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

				<div
					className="modal fade"
					id={"addComponentModal-" + this.props.id}
					tabIndex="-1"
					role="dialog"
					data-backdrop="static"
					data-keyboard={false}
					aria-labelledby="personInfoModalTitle"
					aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addComponentModalTitle">Add Component</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="componentType">Component Type:</label>
                                    <select
                                        name="componentType"
                                        className="form-control"
                                        value={this.state.component_type}
                                        onChange={(event) => this.setState({component_type: event.target.value})}
                                        required>
                                        <option>Not Specified</option>
                                        <option value="agenda">Agenda</option>
                                        <option value="budget">Budget</option>
                                        <option value="meetingNotes">Meeting Notes</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="componentName">Component Name:</label>
                                    <input
                                        type="text"
                                        name="componentName"
                                        className="form-control"
										value={this.state.component_name}
                                        onChange={(event) => this.setState({ component_name: event.target.value })}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contentType">Content Type:</label>
									<select
										type="text"
                                        name="contentType"
										className="form-control"
										value={this.state.content_type}
                                        onChange={(event) => this.setState({ content_type: event.target.value })}
                                        required>
										<option>Not Specified</option>
										<option value="file">File</option>
										<option value="url">URL</option>
									</select>
                                </div>
								{ (this.state.content_type === "file") ? 
									<div className="form-group">
										<label htmlFor="componentFile">File:</label>
										<input
											type="file"
											name="componentFile"
											className="form-control"
											value={this.state.file}
											onChange={this.handlePic}/>
									</div> : null }
                                
								{ (this.state.content_type === "url") ? 
									<div className="form-group">
										<label htmlFor="componentUrl">URL:</label>
										<input
											type="text"
											name="componentUrl"
											className="form-control"
											value={this.state.url}
											onChange={(event) => this.setState({ component_url: event.target.value })} />
									</div> : null }
                            </div>
                            <div className="modal-footer">
								<button
                                    type="button"
                                    className="btn btn-success"
                                    data-dismiss="modal"
									onClick={this.addComponent}>
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

				<div className="modal fade" id={"addPartnerModal-" + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="personInfoModalTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addPartnerModalTitle">Add Event Partner</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="partnerName">Partner Name:</label>
									<select
										label="partnerName"
										className="form-control"
										onChange={this.onDropdownSelected}
										multiple>
										{this.createSelectItems()}
									</select>
                                </div>
                            </div>
                            <div className="modal-footer">
								<button
                                    type="button"
                                    className="btn btn-success"
                                    data-dismiss="modal"
									onClick={this.addPartners}>
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="content">
						<div className="event-info">
							<div className="event-header">
								<div className="header-left-buffer"></div>
								<div className="event-base-info">
									<h1>{this.state.event_name}</h1>
									Location: {this.state.event_location}<br />
									Type: {this.state.event_type}
								</div>
								<div className="event-dates">
									Project Start: {this.state.updated_project_start}<br />
									Event Start: {this.state.updated_event_start}<br />
									Event End: {this.state.updated_event_end}<br />
									Project End: {this.state.updated_project_end}
								</div>
							</div>
						</div>
						{(this.canEditEvent()) ?
							<div className="mod-btns">
								<Button
									className="btn btn-success"
									data-toggle="modal"
									data-target={"#addComponentModal-" + this.props.id}>
									Add Component
								</Button>
								<Button
									className="btn btn-success"
									data-toggle="modal"
									data-target={"#addPartnerModal-" + this.props.id}>
									Add Partner
								</Button>
								<Button
									className="btn btn-warning"
									data-toggle="modal"
									data-target={"#editEventModal"}>
									Edit Event
								</Button>
							</div> : null }
                        {this.state.components.map(comp =>
							<EventComponentCard
								color={comp.color}
								name={comp.name}
								event_id={this.state.event_id}
								component_id={comp.id}
								link={this.state.event_id + "/components/" + comp.id + "/"} />
						)}
						<PartnersComponentCard
							color="red"
							name="Partners"
							link={this.state.event_id + "/partners/"} />
                    </div>
                </div>
			</div>
		);
	}
}

export default Event;