import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';
import EditEventComponentModal from './EditEventComponentModal';

class EventComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_id: this.props.match.params.event_id,
            event_owner_id: "",
            event_partners: {},
            component_id: this.props.match.params.component_id,
            component_type: "",
            name: "",
            content_type: "",
            file: "",
            url: "",
            color: "",
        };

        this.canEditComponent = this.canEditComponent.bind(this);
    }

    componentDidMount() {
        var self = this;

        // Get information about the event component
        var curEventRef = fire.database().ref("events").child(this.state.event_id);
        var curComponentRef = curEventRef.child("components").child(this.state.component_id);
		curComponentRef.on("value", function(data) {
            var component = data.val() ? data.val() : {};

            self.setState({
                component_type: component.component_type,
                name: component.name ? component.name : "Component",
                content_type: component.content_type,
                file: component.file,
                url: component.url,
                color: component.color,
            });
        });

        // Get information about the event
        fire.database().ref("events").child(this.state.event_id).on("value", function(data) {
            var event = data.val() ? data.val() : {};

            self.setState({
                event_owner_id: event.owner_id,
                event_partners: event.partners,
            });
        });
    }

    canEditComponent() {
        var user = fire.auth().currentUser;
        if(!user) {
            return false;
        }
		var cur_user_id = user.uid;

		// Check if the user is the event owner
		if(cur_user_id === this.state.event_owner_id) {
			return true;
		}

		// Check if the user is a partner with edit privileges
		for(var partner_id in this.state.event_partners) {
			var partner = this.state.event_partners[partner_id];
			if(cur_user_id === partner_id) {
				return (partner.priv === "Edit") || (partner.priv === "Owner");
			}
		}

		return false;
    }

	render() {
        return (
            <div className="EventComponent">
                <EditEventComponentModal
                    event_id={this.state.event_id}
                    component_id={this.state.component_id}
                    component_type={this.state.component_type}
                    name={this.state.name}
                    content_type={this.state.content_type}
                    file={this.state.file}
                    url={this.state.url}
                    color={this.state.color} />

                <div className="container">
                    <div className="content">
                        <h1>{this.state.name}</h1>
                        {(this.canEditComponent()) ? 
                            <button
                            className="btn btn-warning"
                            data-toggle="modal"
                            data-target="#editEventComponentModal">Edit</button> : null }
                        {(this.state.content_type === "file") ? 
                            <iframe
                                className="agenda-iframe"
                                src={this.state.file}
                                title={this.props.id}
                                allowFullScreen></iframe>
                            : <iframe
                                className="agenda-iframe"
                                src={this.state.url}
                                title={this.props.id}
                                allowFullScreen></iframe> }
                    </div>
                </div>
            </div>
        );
	}
}

export default EventComponent;