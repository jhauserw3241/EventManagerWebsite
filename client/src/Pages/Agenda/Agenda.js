import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

class Agenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name: "",
            type: "",
            path: "",
            url: ""
        };
    }

    componentDidMount() {
        var self = this;

        var agendasRef = fire.database().ref("agendas/");
        var curAgendaRef = agendasRef.orderByChild("id").equalTo(parseInt(this.props.match.params.id));
		curAgendaRef.on("value", function(data) {
            var agenda = data.val()[self.state.id];
            self.setState({
                name: agenda.name,
                type: agenda.type,
                path: agenda.path,
                url: agenda.url
            });
        });
    }

	render() {
        if(this.state.type === "path") {
            return (
                <div className="Agenda">
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
                <div className="Agenda">
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

export default Agenda;