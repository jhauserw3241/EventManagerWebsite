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

		this.addComponent = this.addComponent.bind(this);
		this.createSelectItems = this.createSelectItems.bind(this);
		this.onDropdownSelected = this.onDropdownSelected.bind(this);
		this.addPartners = this.addPartners.bind(this);
		this.handlePic = this.handlePic.bind(this);
    }

    componentDidMount() {
        var self = this;

		// Get information about this event
        var eventsRef = fire.database().ref("events/");
        var curEventRef = eventsRef.child(self.state.event_id);
        curEventRef.on("value", function(data) {
            var event = data.val();
            self.setState({
                event_name: event.name,
                event_type: event.type,
				event_location: event.location,
				project_start: event.project_start,
				event_start: event.event_start,
				event_end: event.event_end,
				project_end: event.project_end,
				owner_id: event.owner_id,
                components: event.components ? Object.values(event.components) : [],
            });
		});
		
		// Get list of all people
		var peopleRef = fire.database().ref("users");
		peopleRef.on("value", (data) =>
			this.setState({ people: data.val() ? data.val() : [] }));

		// Get list of current partners
		var partnersRef = fire.database().ref("events").child(this.state.event_id).child("partners");
		partnersRef.on("value", (data) =>
			this.setState({
				event_partners: data.val() ? data.val() : [],
				updated_event_partners: data.val() ? data.val() : [],
			}));
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
			temp[person_id] = person_name;
			this.setState({ updated_event_partners: temp });
		}
	}

	addPartners() {
		// Update list of event partners
		var eventRef = fire.database().ref("events").child(this.state.event_id);
		eventRef.update({
			partners: this.state.updated_event_partners,
		});
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
                                    <input
                                        type="text"
                                        name="componentType"
										className="form-control"
										value={this.state.component_type}
                                        onChange={(event) => this.setState({ component_type: event.target.value })}
                                        required />
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
								<h1>{this.state.event_name}</h1>
								<div className="event-dates">
									Project Start: {this.state.project_start}<br />
									Event Start: {this.state.event_start}<br />
									Event End: {this.state.event_end}<br />
									Project End: {this.state.project_end}
								</div>
							</div>
							<div className="event-location">
								Location: {this.state.event_location}<br />
								Type: {this.state.event_type}
							</div>
						</div>
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
						</div>
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