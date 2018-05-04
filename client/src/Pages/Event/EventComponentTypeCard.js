import React, { Component } from 'react';
import EventComponentTypeModal from './../EventComponentTypeModal/EventComponentTypeModal';
import fire from './../../fire';
import './../../CSS/Card.css';

class EventComponentTypeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            components: {},
		};
		
		this.deleteEventComponent = this.deleteEventComponent.bind(this);
    }

    componentDidMount() {
        var self = this;

        fire.database().ref("events").child(self.props.event_id).child("components").on("value", function(data) {
			var components = data.val() ? data.val() : {};
			var filteredComponents = {};

			// Get the components of the specified type
			for(var component_id in components) {
				var component = components[component_id];
				if(component.component_type === self.props.type) {
					filteredComponents[component_id] = component;
				}
			}

			self.setState({ components: filteredComponents });
		});
	}

	deleteEventComponent(event, component_id) {
		event.preventDefault();

		fire.database().ref("events").child(this.props.event_id).child("components").child(component_id).remove();
	}

	render() {
		// Check if there are no components for this component type
		if(Object.keys(this.state.components).length === 0) {
			return null;
		}

		return (
			<div
				className="EventComponentCard side-card"
				data-target={"#eventComponentTypeModal-" + this.props.type}
				data-toggle="modal">
				<EventComponentTypeModal
					event_id={this.props.event_id}
					component_type={this.props.type}
					components={this.state.components}
					canEdit={this.props.canEdit}
					deleteEventComponent={this.deleteEventComponent} />
				<div className="side-card-img" style={{ backgroundColor: "blue" }}></div>
				<div className="side-card-text">
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default EventComponentTypeCard;
