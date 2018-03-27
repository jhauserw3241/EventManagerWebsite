import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
            url: "",
            component_partners: {},
            updated_component_partners: {},
        };
        
		this.createSelectItems = this.createSelectItems.bind(this);
		this.onDropdownSelected = this.onDropdownSelected.bind(this);
		this.addPartners = this.addPartners.bind(this);
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
                url: component.url,
                component_partners: component.partners ? component.partners : [],
                updated_component_partners: component.partners ? component.partners : [],
            });
        });
    }
	
	createSelectItems() {
		var items = [];
		var options_count = 0;
		for (var person_id in this.props.people) {
			var person = this.props.people[person_id];
			items.push(
				<option
					key={options_count}
					value={person_id}
					// Check if the person is already added to the event
					disabled={
						(person_id == this.props.event_owner_id) ||
						(Object.keys(this.props.event_partners).indexOf(person_id) > -1) ||
						(Object.keys(this.state.component_partners).indexOf(person_id) > -1)
					}>
					{person.first_name + " " + person.last_name}
				</option>);

			options_count += 1;
		}
		return items;
	}  
   
	onDropdownSelected(event) {
		var person_id = event.target.value;

		// Check if person is already added as partner
		if(Object.keys(this.state.component_partners).indexOf(person_id) <= -1) {
			// Get person information
			var person = this.state.people[person_id];
			var person_name = person.first_name + " " + person.last_name;

			// Add person to list of partners
			var temp = this.state.updated_component_partners;
			temp[person_id] = person_name;
			this.setState({ updated_component_partners: temp });
		}
	}

	addPartners() {
		// Update list of event partners
		var eventRef = fire.database().ref("events").child(this.props.event_id);
		eventRef.update({
			partners: this.state.updated_component_partners,
		});
	}

	render() {
        if(this.state.content_type === "path") {
            return (
                <div className="EventComponent">
                    <div className="modal fade" id={"addPartnerModal-" + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="personInfoModalTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addPartnerModalTitle">Add Event Partner</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="partnerName">Partner Name:</label>
                                        <select
                                            label="partnerName"
                                            className="form-control"
                                            onChange={this.onDropdownSelected}
                                            multiple>
                                            {this.createSelectItems()}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        data-dismiss="modal"
                                        onClick={this.addPartners}>
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-dismiss="modal">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="content">
                            <h1>{this.state.name}</h1>
                            
                            <div className="mod-btns">
                                <Button
                                    className="btn btn-success"
                                    data-toggle="modal"
                                    data-target={"#addPartnerModal-" + this.props.id}>
                                    Add Partner
                                </Button>
                            </div>

                            <iframe className="agenda-iframe" src={this.state.path} allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="EventComponent">                
                    <div className="modal fade" id={"addPartnerModal-" + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="personInfoModalTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addPartnerModalTitle">Add Event Partner</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="partnerName">Partner Name:</label>
                                        <select
                                            label="partnerName"
                                            className="form-control"
                                            onChange={this.onDropdownSelected}
                                            multiple>
                                            {this.createSelectItems()}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        data-dismiss="modal"
                                        onClick={this.addPartners}>
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-dismiss="modal">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="content">
                            <h1>{this.state.name}</h1>
                            
                            <div className="mod-btns">
                                <Button
                                    className="btn btn-success"
                                    data-toggle="modal"
                                    data-target={"#addPartnerModal-" + this.props.id}>
                                    Add Partner
                                </Button>
                            </div>

                            <iframe className="agenda-iframe" src={this.state.url} allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            );
        }
	}
}

export default EventComponent;