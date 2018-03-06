import React, { Component } from 'react';
import EventsList from './EventsList';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import fire from './../../fire';
import './../../CSS/Modal.css';

class Events extends Component {
	constructor(props) {
		super(props);

		this.state = {
			events: [],
			org: "list",
			modalIsOpen: false,
			name: "",
			type: "",
			completed_date: "",
			formError: ""
		};

		this.toggleOrganization = this.toggleOrganization.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.addEvent = this.addEvent.bind(this);
		this.deleteEvent = this.deleteEvent.bind(this);
	}
	
	componentDidMount() {
		var eventsRef = fire.database().ref("events");
		eventsRef.orderByChild("name").on("value", (data) =>
			this.setState({ events: data.val() }));
	}

	toggleOrganization(event) {
		console.log(this.state.org);
		if(this.state.org === "list") {
			this.setState({ org: "cards" });
		} else {
			this.setState({ org: "list" });
		}
	}

	openModal() {
		this.setState({modalIsOpen: true});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}

	addEvent(event) {
		event.preventDefault();

		var self = this;

		var curEventRef = fire.database().ref("events").push();
		var event_id = curEventRef.path["pieces_"][1];
		curEventRef.set({
			id: event_id,
			name: this.state.name,
			type: this.state.type,
			completed_date: this.state.completed_date,
			color: "#"+((1<<24)*Math.random()|0).toString(16) // Generate random color
		}).catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
		});

		this.closeModal();
	}

	deleteEvent(event, id) {
		event.preventDefault();

		var self = this;

		var curEventRef = fire.database().ref("events").child(id);
		curEventRef.remove()
		.catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
		});
	}
	
	render() {
		return (
			<div className="Events">			
				<div className="container">
					<Modal
						className="modal-content"
						isOpen={this.state.modalIsOpen}
						onRequestClose={this.closeModal}
						ariaHideApp={false}
						contentLabel="Add Event Modal">
						
						<div className="modal-header">
							<h2>Add Event</h2>
							<button className="close" onClick={this.closeModal}>&times;</button>
						</div>
						<div className="modal-body">
							<form onSubmit={this.addEvent}>
								<fieldset>
									<label htmlFor="name">Name:</label>
									<input
										type="text"
										name="name"
										onChange={(event) => this.setState({name: event.target.value})} />
								</fieldset>
								<fieldset>
									<label htmlFor="type">Type:</label>
									<input
										type="text"
										name="type"
										onChange={(event) => this.setState({type: event.target.value})} />
								</fieldset>
								<fieldset>
									<label htmlFor="completed-date">Completed Date:</label>
									<input
										type="text"
										name="completed-date"
										onChange={(event) => this.setState({completed_date: event.target.value})} />
								</fieldset>
								<button className="btn btn-primary modal-submit-btn" type="submit">Submit</button>
							</form>
						</div>
					</Modal>

					<div className="mod-btns">
						<div className="org-btns">
							<Button
								onClick={this.toggleOrganization}
								disabled={this.state.org === "list"}
								bsStyle={this.state.org === "list" ? "primary" : "default"} >
								List
							</Button>
							<Button
								onClick={this.toggleOrganization}
								disabled={this.state.org === "cards"}
								bsStyle={this.state.org === "cards" ? "primary" : "default"} >
								Cards
							</Button>
						</div>
						<div>
							<Button onClick={this.openModal}>Add</Button>
						</div>
					</div>
					<EventsList
						org={this.state.org}
						events={this.state.events}
						deleteEvent={this.deleteEvent} />
				</div>
			</div>
		);
	}
}

export default Events;
