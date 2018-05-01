import React, { Component } from 'react';
import ItemsDashboard from './../ItemsDashboard/ItemsDashboard';
import AddEventModal from './AddEventModal';
import { Redirect } from 'react-router-dom';
import fire from './../../fire';

class Events extends Component {
	constructor(props) {
		super(props);

		this.state = {
			events: {},
			formError: ""
		};

		this.deleteEvent = this.deleteEvent.bind(this);
	}
	
	componentDidMount() {
		var self = this;

		// Verify that the user is logged in
		if(fire.auth().currentUser) {
			var user_id = fire.auth().currentUser.uid;

			// Get all the projects that the current user is the owner of
			var eventsRef = fire.database().ref("events");
			eventsRef.on("value", function(data) {
				var events = data.val() ? data.val() : [];

				var temp = {};
				for(var event_id in events) {
					var event = events[event_id];

					// Check if user is owner
					if(event.owner_id === user_id) {
						temp[event.id] = event;
					}

					// Check if user is a event partner
					var partners = event.partners ? event.partners : [];
					if(user_id in partners) {
						temp[event.id] = event;
					}
				}
				self.setState({ events: temp });
			});
		}
	}

	deleteEvent(event, id) {
		event.preventDefault();

		var curEventRef = fire.database().ref("events").child(id);
		curEventRef.remove()
		.catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
		});
	}
	
	render() {
		if(!fire.auth().currentUser) {
			return(<Redirect to="/" />);
		}

		return (
			<div className="Events">
				<div className="container">
					<AddEventModal />
	
					{ (this.state.formError !== "") ?
						<div class="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<ItemsDashboard
						dashboardName="Events"
						linkPrefix="/event/"
						addModalId="#addEventModal"
						items={this.state.events}
						deleteItem={this.deleteEvent} />
				</div>
			</div>
		);
	}
}

export default Events;
