import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

class EventComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_id: this.props.match.params.event_id,
            component_id: this.props.match.params.component_id,
            name: "",
            content_type: "",
            path: "",
            url: ""
        };
    }

    componentDidMount() {
        var self = this;

        var curEventRef = fire.database().ref("events").child(this.state.event_id);
        var curComponentRef = curEventRef.child("components").child(this.state.component_id);
		curComponentRef.on("value", function(data) {
            var component = data.val();
            self.setState({
                name: component.name ? component.name : "Component",
                content_type: component.type,
                path: component.path,
                url: component.url
            });
        });
    }

	render() {
        if(this.state.content_type === "path") {
            return (
                <div className="EventComponent">
                    <div className="container">
                        <div className="content">
                            <h1>{this.state.name}</h1>
                            <iframe className="agenda-iframe" src={this.state.path} allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="EventComponent">
                    <div className="container">
                        <div className="content">
                            <h1>{this.state.name}</h1>
                            <iframe className="agenda-iframe" src={this.state.url} allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            );
        }
	}
}

export default EventComponent;