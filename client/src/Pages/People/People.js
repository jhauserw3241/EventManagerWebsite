import React, { Component } from 'react';
import PersonCard from './PersonCard';
import fire from './../../fire';
import './../../CSS/Modal.css';
import AddPersonModal from './AddPersonModal';

class People extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			formError: "",
		};
	}
	
	componentDidMount() {
		var self = this;

		if(!fire.auth().currentUser) {
			return;
		}

		var cur_member_id = fire.auth().currentUser.uid;

		fire.database().ref("users").on("value", function(data) {
			var members = data.val() ? data.val() : [];
			var filteredMembers = [];

			for(var member_id in members) {
				var member = members[member_id];

				if(	(member.status === "admin") ||
					(member.status === "member") ||
					((member.status === "placeholder") &&
					(member.public === true)) ||
					((member.status === "placeholder") &&
					(member.creator_id === cur_member_id))) {
					filteredMembers.push(member);
				}
			}

			self.setState({ users: filteredMembers });
		});
	}
	
	render() {
		return (
			<div className="People">
				<div className="container">
					<AddPersonModal
						handleErrors={(error) => this.setState({ formError: error })} />

					{ (this.state.formError !== "") ?
						<div className="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<button
						className="btn btn-success"
						data-toggle="modal"
						data-target="#addPersonModal">Add Person</button>
					<div className="list-container">
						{this.state.users.map(person =>
							<PersonCard
								key={person.id}
								id={person.id}
								first_name={person.first_name}
								last_name={person.last_name}
								email={person.email}
								phone_number={person.phone_number}
								address={person.address}
								notes={person.notes}
								pic={person.pic}
								color={person.color} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default People;