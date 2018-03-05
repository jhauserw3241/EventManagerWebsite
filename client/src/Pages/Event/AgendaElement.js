import React, { Component } from 'react';
import AgendaTable from './../Agenda/AgendaTable';
import fire from './../../fire';
import './../../CSS/Card.css';

class AgendaElement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            agendas: []
        };
    }

    componentDidMount() {
        var agendasRef = fire.database().ref("agendas/");
        agendasRef.on("value", data =>
            this.setState({ agendas: data.val() }));
    }

	render() {
        var columns= [
            {
                key: "name",
                name: "Agenda Name"
            }
        ]

        var agenda_count = 0;
        var data = [];
        for(var agenda_id in this.state.agendas) {
            if(agenda_id in this.props.agenda_ids) {
                var agenda = this.state.agendas[agenda_id];
                var temp = {
                    id: agenda_count,
                    name: agenda.name,
                    link: "agenda/" + agenda.id
                };
    
                agenda_count += 1;
    
                data.push(temp);
            }
        }

		return (
			<div className="AgendaElement">
                <h3 className="section-header">Agendas</h3>
                <AgendaTable columns={columns} data={data} />
			</div>
		);
	}
}

export default AgendaElement;