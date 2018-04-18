import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import fire from './../../fire';

class AddPartnerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
			partners: [],
			people: {},
        };

		this.createSelectItems = this.createSelectItems.bind(this);
		this.onDropdownSelected = this.onDropdownSelected.bind(this);
		this.addPartners = this.addPartners.bind(this);
    }

    componentDidMount() {
        var self = this;

		// Get information about this event
        fire.database().ref("events").child(self.props.event_id).child("partners").on("value", (data) =>
            this.setState({ partners: data.val() ? data.val() : {} }));

		// Get list of all people
		var peopleRef = fire.database().ref("users");
		peopleRef.on("value", (data) =>
			this.setState({ people: data.val() ? data.val() : {} }));
	}
	
	createSelectItems() {
		var items = [];
		var options_count = 0;
		for (var person_id in this.state.people) {
			var person = this.state.people[person_id];
			items.push(
				<option
					key={options_count}
					value={person_id}
					// Check if the person is already added to the event
					disabled={
						(person_id == this.state.owner_id) ||
						(Object.keys(this.state.partners).indexOf(person_id) > -1)
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
		if(Object.keys(this.state.partners).indexOf(person_id) <= -1) {
			// Get person information
			var person = this.state.people[person_id];
			var person_name = person.first_name + " " + person.last_name;

			// Add person to list of partners
			var temp = this.state.partners;
			temp[person_id] = {
				name: person_name,
				role: "Contributor",
				priv: "View",
			};
			this.setState({ partners: temp });
		}
	}

	addPartners() {
        var updates = {};
		updates['/events/' + this.props.event_id + "/partners/"] = this.state.partners;
		for(var person_id in this.state.partners) {
			updates['/users/' + person_id + '/events/' + this.props.event_id] = this.props.event_id;
		}
        fire.database().ref().update(updates);
	}

	render() {
        return (
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
		);
	}
}

export default AddPartnerModal;