import React, { Component } from 'react';
import EventComponentCard from './EventComponentCard';
import PartnersComponentCard from './PartnersComponentCard';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import fire from './../../fire';
import './../../CSS/Card.css';
import './../../CSS/Event.css';
import PartnerComponent from '../PartnerComponent/PartnerComponent';

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
			components: [],
			component_type: "",
			component_name: "",
			content_type: "",
			component_path: "",
			component_url: "",
        };

        this.addComponent = this.addComponent.bind(this);
    }

    componentDidMount() {
        var self = this;

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
                components: event.components ? Object.values(event.components) : [],
            });
        });
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
            path: this.state.component_path ? this.state.component_path : "",
            url: this.state.component_url ? this.state.component_url : "",
			color: "#"+((1<<24)*Math.random()|0).toString(16), // Generate random color
		}).catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
		});
    }

	render() {
        return (
			<div className="Event">
				<div className="modal fade" id={"addComponentModal-" + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="personInfoModalTitle" aria-hidden="true">
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
                                        onChange={(event) => this.setState({ component_type: event.target.value })}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="componentName">Component Name:</label>
                                    <input
                                        type="text"
                                        name="componentName"
                                        className="form-control"
                                        onChange={(event) => this.setState({ component_name: event.target.value })}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contentType">Content Type:</label>
                                    <input
                                        type="text"
                                        name="contentType"
                                        className="form-control"
                                        onChange={(event) => this.setState({ content_type: event.target.value })}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="componentPath">Path:</label>
                                    <input
                                        type="text"
                                        name="componentPath"
                                        className="form-control"
                                        onChange={(event) => this.setState({ component_path: event.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="componentUrl">URL:</label>
                                    <input
                                        type="text"
                                        name="componentUrl"
                                        className="form-control"
                                        onChange={(event) => this.setState({ component_url: event.target.value })} />
                                </div>
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