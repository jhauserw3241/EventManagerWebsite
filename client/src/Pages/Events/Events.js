import React, { Component } from 'react';
import EventElement from './EventElement';
import fire from './../../fire';

class Events extends Component {
	constructor(props) {
		super(props);

		this.state = {
			events: []
		};
	}
	
	componentDidMount() {
		var eventsRef = fire.database().ref("events");
		eventsRef.orderByChild("name").on("value", (data) =>
			this.setState({ events: data.val() }));
	}
	
	render() {
		return (
			<div className="Events">			
				<div className="container">
					<div className="list-container">
						{this.state.events.map(event =>
							<EventElement
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
