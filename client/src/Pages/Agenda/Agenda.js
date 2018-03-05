import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

class Agenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            type: "",
            path: "",
            url: ""
        };
    }

    componentDidMount() {
        var self = this;

        var agendasRef = fire.database().ref("agendas/");
		agendasRef.on("value", function(data) {
            var agenda = data.val()[self.state.id];
            self.setState({
                type: agenda.type,
                path: agenda.path,
                url: agenda.url
            });
        });
    }

	render() {
		return (
			<div className="Agenda">
                <div className="container">
                    <div className="content">
                        <h1>Agenda</h1><br/>
                        <iframe className="agenda-iframe" src="https://www.youtube.com/embed/A6XUVjK9W4o" allowFullScreen></iframe>
                    </div>
                </div>
			</div>
		);
	}
}

export default Agenda;