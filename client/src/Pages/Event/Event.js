import React, { Component } from 'react';
import GeneralInfoElement from './GeneralInfoElement';
import AgendaElement from './AgendaElement';
import fire from './../../fire';
import './../../CSS/Card.css';

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name: "",
            type: "",
            completed_date: "",
            agendas: []
        };
    }

    componentDidMount() {
        var self = this;

        var eventsRef = fire.database().ref("events/");
        var curEventRef = eventsRef.orderByChild("id").equalTo(parseInt(this.props.match.params.id));
        curEventRef.on("value", function(data) {
            var event = data.val()[parseInt(self.state.id)];
            self.setState({
                name: event.name,
                type: event.type,
                completed_date: event.completed_date,
                agendas: event.agendas ? event.agendas : []
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
                        <AgendaElement agenda_ids={this.state.agendas} />
                    </div>
                </div>
			</div>
		);
	}
}

export default Event;