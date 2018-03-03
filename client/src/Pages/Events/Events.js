import React, { Component } from 'react';
import EventsList from './EventsList';
import Toggle from 'react-bootstrap-toggle';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
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
		return (
			<div className="Events">			
				<div className="container">
					<div className="mod-btns">
						<div className="org-btns">
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
					</div>
					<EventsList
						org={this.state.org}
						events={this.state.events} />
				</div>
				
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}

export default Events;
