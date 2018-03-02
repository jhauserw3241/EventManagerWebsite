import React, { Component } from 'react';
import EventElement from './EventElement';
import Toggle from 'react-bootstrap-toggle';
import { Button } from 'react-bootstrap';
import fire from './../../fire';

class Events extends Component {
	constructor(props) {
		super(props);

		this.state = {
			events: [],
			org: "list"
		};

		this.toggleOrganization = this.toggleOrganization.bind(this);
	}
	
	componentDidMount() {
		var eventsRef = fire.database().ref("events");
		eventsRef.orderByChild("name").on("value", (data) =>
			this.setState({ events: data.val() }));
	}

	toggleOrganization(event) {
		if(this.state.org === "cards") {
			this.setState({ org: "list" });
		} else if (this.state.org === "list") {
			this.setState({ org: "cards" });
		} else {
			this.setState({ org: "list" });
		}
	}
	
	render() {
		console.log(this.state.org);

		var divStyle = {
			float: "right"
		}
		return (
			<div className="Events">			
				<div className="container">
					<div style={divStyle}>
						<Button
							onClick={this.toggleOrganization}
							disabled={this.state.org === "list"}
							bsStyle={this.state.org === "list" ? "primary" : "default"}
							>List</Button>
						<Button
							onClick={this.toggleOrganization}
							disabled={this.state.org === "cards"}
							bsStyle={this.state.org === "cards" ? "primary" : "default"}
							>Cards</Button>
					</div>
					<div className="list-container">
						{this.state.events.map(event =>
							<EventElement
								org={this.state.org}
								key={event.id}
								id={event.id}
								name={event.name}
								type={event.type}
								completed_date={event.completed_date} />
						)}
					</div>
				</div>
				
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}

export default Events;
