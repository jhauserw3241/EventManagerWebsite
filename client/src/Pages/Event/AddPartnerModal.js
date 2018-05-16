import React, { Component } from 'react';
import Overlay from './../Common/Overlay';
import PartnerSelectInput from './../PartnerForm/PartnerSelectInput';
import fire from './../../fire';

class AddPartnerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
			partners: [],
			people: {},
        };

		this.addPartners = this.addPartners.bind(this);
    }

    componentDidMount() {
		var self = this;
		
		// Check if the user is logged in
		var user = fire.auth().currentUser;
		if(!user) {
			return;
		}

		// Get information about this event
        fire.database().ref("events").child(self.props.event_id).child("partners").on("value", (data) =>
            this.setState({ partners: data.val() ? data.val() : {} }));

		// Get list of all people
		var peopleRef = fire.database().ref("users");
		peopleRef.on("value", function(data) {
			var members = data.val() ? data.val() : {};
			var filteredMembers = {};

			for(var member_id in members) {
				var member = members[member_id];

				if(	(member.status === "admin") ||
					(member.status === "member") ||
					((member.status === "placeholder") &&
					(member.public === true)) ||
					((member.status === "placeholder") &&
					(member.creator_id === user.uid))) {
					filteredMembers[member_id] = member;
				}
			}

			self.setState({ people: filteredMembers });
		});
	}

	addPartners() {
        var updates = {};
		updates['/events/' + this.props.event_id + "/partners/"] = this.state.partners;
		for(var person_id in this.state.partners) {
			updates['/users/' + person_id + '/events/' + this.props.event_id] = this.props.event_id;
		}
		fire.database().ref().update(updates);

		// Close the modal
		this.props.updateModalVisibility(false);
	}

	render() {
        return (
			<Overlay
				id={"addPartnerModal-" + this.props.id}
				title="Add Event Partner"
				visible={this.props.visible}
				updateModalVisibility={this.props.updateModalVisibility}>
				<PartnerSelectInput
					available_list={this.state.people}
					selected_list={this.state.partners}
					updateSelectedOptions={(selected_list) => this.setState({ partners: selected_list })} />
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-success"
						onClick={this.addPartners}>
						Add
					</button>
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => this.props.updateModalVisibility(false)}>
						Close
					</button>
				</div>
			</Overlay>
		);
	}
}

export default AddPartnerModal;