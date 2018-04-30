import React, { Component } from 'react';
import MemberRequestCard from './MemberRequestCard';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import fire from './../../fire';
import './../../CSS/Modal.css';

class MemberApproval extends Component {
	constructor(props) {
		super(props);

		this.state = {
			members: [],
			formError: "",
		};
	}
	
	componentDidMount() {
		var self = this;
		fire.database().ref("users").on("value", function(data) {
			var members = data.val() ? data.val() : {};
			var filteredMembers = [];

			for(var member_id in members) {
				var member = members[member_id];
				if(member.status === "pending member") {
					filteredMembers.push(member);
				}
			}

			self.setState({ members: filteredMembers })
		});
	}
	
	render() {
		if(!fire.auth().currentUser) {
			window.location = "/";
		}
		return (
			<div className="MemberApproval">
				<div className="container">
					{ (this.state.formError !== "") ?
						<div class="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<div className="list-container">
						{this.state.members.map(member =>
							<MemberRequestCard
								key={member.id}
								id={member.id}
								first_name={member.first_name}
								last_name={member.last_name}
								email={member.email}
								phone_number={member.phone_number}
								address={member.address}
								notes={member.notes}
								agencies={member.agencies}
								pic={member.pic} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default MemberApproval;