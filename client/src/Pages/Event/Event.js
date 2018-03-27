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
            name: "",
            type: "",
			location: "",
			project_start: "",
			event_start: "",
			event_end: "",
			project_end: "",
            components: [],
            modalIsOpen: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addComponent = this.addComponent.bind(this);
    }

    componentDidMount() {
        var self = this;

        var eventsRef = fire.database().ref("events/");
        var curEventRef = eventsRef.child(self.state.event_id);
        curEventRef.on("value", function(data) {
            var event = data.val();
            self.setState({
                name: event.name,
                type: event.type,
				location: event.location,
				project_start: event.project_start,
				event_start: event.event_start,
				event_end: event.event_end,
				project_end: event.project_end,
                components: event.components ? Object.values(event.components) : [],
            });
        });
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    addComponent(event) {
        event.preventDefault();

		var self = this;

		// Create event
		var curCompenentRef = fire.database().ref("events").child(self.state.event_id).child("components").push();
		var component_id = curCompenentRef.path["pieces_"][3];
		curCompenentRef.set({
            id: component_id,
            component_type: "test",
			name: this.state.name,
			content_type: this.state.type,
            path: this.state.path ? this.state.path : "",
            url: this.state.url ? this.state.url : "",
			color: "#"+((1<<24)*Math.random()|0).toString(16), // Generate random color
		}).catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
		});

		this.closeModal();
    }

	render() {
        return (
			<div className="Event">
                <div className="container">
                    <Modal
                        className="modal-content"
                        id="addComponentModal"
						isOpen={this.state.modalIsOpen}
						onRequestClose={this.closeModal}
						ariaHideApp={false}
						contentLabel="Add Component Modal">
						
						<div className="modal-header">
							<h2>Add Component</h2>
							<button className="close" onClick={this.closeModal}>&times;</button>
						</div>
						<div className="modal-body">
							<form onSubmit={this.addComponent}>
                                <fieldset>
									<label htmlFor="component_type">Component Type:</label>
									<input
										type="text"
										name="component_type"
										onChange={(event) => this.setState({component_type: event.target.value})}
										required />
								</fieldset>
                                <fieldset>
									<label htmlFor="name">Name:</label>
									<input
										type="text"
										name="name"
										onChange={(event) => this.setState({name: event.target.value})}
										required />
								</fieldset>
								<fieldset>
									<label htmlFor="content_type">Content Type:</label>
									<input
										type="text"
										name="content_type"
										onChange={(event) => this.setState({content_type: event.target.value})}
										required />
								</fieldset>
								<fieldset>
									<label htmlFor="path">Path:</label>
									<input
										type="text"
										name="path"
										onChange={(event) => this.setState({path: event.target.value})} />
								</fieldset>
                                <fieldset>
									<label htmlFor="url">URL:</label>
									<input
										type="text"
										name="url"
										onChange={(event) => this.setState({url: event.target.value})} />
								</fieldset>
								<button className="btn btn-primary modal-submit-btn" type="submit">Submit</button>
							</form>
						</div>
					</Modal>

                    <div className="content">
						<div className="event-info">
							<div className="event-header">
								<h1>{this.state.name}</h1>
								<div className="event-dates">
									Project Start: {this.state.project_start}<br />
									Event Start: {this.state.event_start}<br />
									Event End: {this.state.event_end}<br />
									Project End: {this.state.project_end}
								</div>
							</div>
							<div className="event-location">
								Location: {this.state.location}
							</div>
						</div>
						<div className="mod-btns">
                        	<Button className="btn btn-success" onClick={this.openModal}>Add</Button>
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