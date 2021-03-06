import React, { Component } from 'react';
import PersonCard from './PersonCard';
import fire from './../../fire';
import './../../CSS/Modal.css';
import AddPersonModal from './AddPersonModal';

class People extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cur_user: {},
			users: [],
			formError: "",
			addModalVisible: false,
		};

		this.updateAddModalVisibility = this.updateAddModalVisibility.bind(this);
		this.shouldShowPerson = this.shouldShowPerson.bind(this);
	}
	
	componentDidMount() {
		var self = this;

		if(!fire.auth().currentUser) {
			return;
		}

		var cur_member_id = fire.auth().currentUser.uid;
		var cur_member = {};

		fire.database().ref("users").on("value", function(data) {
			var members = data.val() ? data.val() : [];
			var filteredMembers = [];

			for(var member_id in members) {
				var member = members[member_id];

				// Set current privs if the member is the current user
				if(member.id === cur_member_id) {
					cur_member = member;
				}

				// Check if the person should be shown to the current user
				if(self.shouldShowPerson(member, cur_member_id)) {
					filteredMembers.push(member);
				}
			}

			self.setState({
				cur_member: cur_member,
				users: filteredMembers,
			});
		});
	}

	shouldShowPerson(member, cur_member_id) {
		return (member.status === "admin") ||		// Check if the user is an admin
			(member.status === "member") ||			// Check if the user is a member
			(	(member.status === "placeholder") && // Check if the user is a public placeholder
				(member.public === true)) ||
			(	(member.status === "placeholder") && // Check if the user is a placeholder created by the current user
				(member.creator_id === cur_member_id));
	}

	updateAddModalVisibility(value) {
		this.setState({ addModalVisible: value });
	}
	
	render() {
		return (
			<div className="People">
				<AddPersonModal
					visible={this.state.addModalVisible}
					handleErrors={(error) => this.setState({ formError: error })}
					updateAddModalVisibility={this.updateAddModalVisibility} />

				<div className="container">
					{ (this.state.formError !== "") ?
						<div className="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<button
						className="btn btn-success"
						onClick={() => this.setState({ addModalVisible: true })}>
						<i className="fa fa-plus"></i> Person
					</button>

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
								color={person.color}
								priv={person.status} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default People;