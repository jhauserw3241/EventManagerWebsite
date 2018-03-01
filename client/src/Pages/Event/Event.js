import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GeneralInfoElement from './GeneralInfoElement';
import fire from './../../fire';
import './../../CSS/Card.css';

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name: "",
            type: "",
            completed_date: ""
        };
    }

    componentDidMount() {
        var self = this;

        var eventsRef = fire.database().ref("events/");
		eventsRef.orderByChild("id").equalTo(parseInt(this.state.id)).on("value", function(data) {
            var event = data.val()[self.state.id];
            self.setState({
                name: event.name,
                type: event.type,
                completed_date: event.completed_date
            });
        });
    }

	render() {
		return (
			<div className="Event">
                <div className="container">
                    <div className="content">
                        <h1>{this.state.name}</h1><br/>
                        <GeneralInfoElement
                            type={this.state.type}
                            completed_date={this.state.completed_date} />
                    </div>
                </div>
			</div>
		);
	}
}

export default Event;