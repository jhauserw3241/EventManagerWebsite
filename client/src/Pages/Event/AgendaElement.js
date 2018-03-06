import React, { Component } from 'react';
import AgendaTable from './AgendaTable';
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import Modal from 'react-modal';
import fire from './../../fire';
import './../../CSS/Card.css';

class AgendaElement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            agendas: [],
            modalIsOpen: false,
            name: "",
            type: "",
            path: "",
            url: "",
            formError: ""
        };

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
        this.addAgenda = this.addAgenda.bind(this);
        this.deleteAgenda = this.deleteAgenda.bind(this);
    }

    componentDidMount() {
        var agendasRef = fire.database().ref("agendas/");
        agendasRef.on("value", data =>
            this.setState({ agendas: data.val() }));
    }

	openModal() {
		this.setState({modalIsOpen: true});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}

    addAgenda(event) {
        event.preventDefault();

        var self = this;
        
        console.log("Model is Open? " + this.state.modalIsOpen);
        console.log("Name: " + this.state.name);
        console.log("Type: " + this.state.type);
        console.log("Path: " + this.state.path);
        console.log("URL: " + this.state.url);

		var curAgendaRef = fire.database().ref("agendas").push();
		var agenda_id = curAgendaRef.path["pieces_"][1];
		curAgendaRef.set({
			id: agenda_id,
			name: this.state.name,
            type: this.state.type,
            path: this.state.path,
            url: this.state.url
		}).catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
        });
        
        /*var num_agendas = -1;
        var curEventRef = fire.database().ref("events/").orderByChild("id").equalTo(this.props.event_id);
        curEventRef.on("value", function(data) {
            var event_agendas = data.val()["agendas"];

            if(event_agendas) {
                curEventRef.update({
                    "agendas": {
                        event_agendas,
                        agenda_id: agenda_id
                    }
                });
            } else {
                curEventRef.update({
                    "agendas": {
                        agenda_id: agenda_id
                    }
                });
            }
            
            console.log(event_agendas);
            
        });*/
		/*curEventRef.({
			id: agenda_id,
			name: this.state.name,
            type: this.state.type,
            path: this.state.path,
            url: this.state.url
		}).catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
		});*/

		this.closeModal();
    }

    deleteAgenda(event, id) {
        event.preventDefault();

		var self = this;

		var curAgendaRef = fire.database().ref("agendas").child(id);
		curAgendaRef.remove()
		.catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
		});
    }

    isStringInList(str, list) {
        for(var index in list) {
            if(String(str) === String(list[index])) {
                return true;
            }
        }
        return false;
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
            if(this.isStringInList(agenda_id, this.props.agenda_ids)) {
                var agenda = this.state.agendas[agenda_id];
                var temp = {
                    id: agenda_count,
                    name: agenda.name ? agenda.name : "Agenda",
                    link: "agenda/" + agenda.id
                };
    
                agenda_count += 1;
    
                data.push(temp);
            }
        }

		return (
			<div className="AgendaElement">
                <Modal
                    className="modal-content"
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    contentLabel="Add Agenda Modal">
                    
                    <div className="modal-header">
                        <h2>Add Agenda</h2>
                        <button className="close" onClick={this.closeModal}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.addAgenda}>
                            <fieldset>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={(event) => this.setState({name: event.target.value})} />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="type">Type:</label>
                                <select onChange={(event) => this.setState({type: event.target.value})}>
                                    <option value="path">Path</option>
                                    <option value="url">URL</option>
                                </select>
                            </fieldset>
                            { (this.state.type === "path") ?
                                <fieldset>
                                    <label htmlFor="path">Path:</label>
                                    <input
                                        type="text"
                                        name="path"
                                        onChange={(event) => this.setState({path: event.target.value})} />
                                </fieldset> : null }
                            { (this.state.type === "url") ?
                                <fieldset>
                                    <label htmlFor="url">URL:</label>
                                    <input
                                        type="text"
                                        name="url"
                                        onChange={(event) => this.setState({url: event.target.value})} />
                                </fieldset> : null }
                            <button className="btn btn-primary modal-submit-btn" type="submit">Submit</button>
                        </form>
                    </div>
                </Modal>

                <h3 className="section-header">Agendas</h3>
                <div className="mod-btns">
                    <button
                        className="btn btn-default"
                        onClick={this.openModal}>
                        Add
                    </button>
                </div>
                <AgendaTable
                    columns={columns}
                    data={data}
                    deleteAgenda={this.deleteAgenda} />
			</div>
		);
	}
}

export default AgendaElement;