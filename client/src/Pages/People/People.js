import React, { Component } from 'react';
import PersonCard from './PersonCard';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import fire from './../../fire';
import './../../CSS/Modal.css';

class People extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			address: "",
			notes: "",
			agencies: "",
			public: false,
			formError: "",
		};

		this.addMember = this.addMember.bind(this);
		this.handlePic = this.handlePic.bind(this);
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

	addMember() {
		var self = this;

		if(!fire.auth().currentUser) {
			return;
		}

		var cur_member_id = fire.database().currentUser.uid;

		// Add user with no account
		var newMemberRef = fire.database().ref("users").push();
		newMemberRef.set({
			id: newMemberRef.key,
			first_name: self.state.first_name,
			last_name: self.state.last_name,
			email: self.state.email,
			phone_number: self.state.phone_number,
			address: self.state.address,
			notes: self.state.notes,
			pic: self.state.pic,
			public: self.state.public,
			status: "placeholder",
			creator_id: cur_member_id,
		}).catch(function(error) {
			self.setState({ formError: error.code + ": " + error.message });
		});
	}

    handlePic(event) {
        event.preventDefault();
        var self = this;

        var file = event.target.files[0];
        var ref = fire.storage().ref('Profiles').child(file.name);        
        ref.put(file).then(()=>{
            ref.getDownloadURL().then((url) => {
                self.setState({pic: url});
            }).catch((err) => {
                self.setState({ formError: err.code + ": " + err.message });
            });
        }).catch((error) => {
            self.setState({ formError: error.code + ": " + error.message });
        });
    }
	
	render() {
		return (
			<div className="People">
				<div className="container">
					<div
						className="modal fade"
						id="addPersonModal"
						tabIndex="-1"
						role="dialog"
						aria-labelledby="addPersonModalTitle"
						aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="addPersonModalTitle">Add Person</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="firstName">First Name:</label>
										<input
											type="text"
											name="firstName"
											className="form-control"
											onChange={(event) => this.setState({ first_name: event.target.value })}
											required />
									</div>
									<div className="form-group">
										<label htmlFor="lastName">Last Name:</label>
										<input
											type="text"
											name="lastName"
											className="form-control"
											onChange={(event) => this.setState({ last_name: event.target.value })}
											required />
									</div>
									<div className="form-group">
										<label htmlFor="email">Email:</label>
										<input
											type="text"
											name="email"
											className="form-control"
											onChange={(event) => this.setState({ email: event.target.value })}
											required />
									</div>
									<div className="form-group">
										<label htmlFor="phone_number">Phone Number:</label>
										<input
											type="text"
											name="phone_number"
											className="form-control"
											onChange={(event) => this.setState({ phone_number: event.target.value })}
											required />
									</div>
									<div className="form-group">
										<label htmlFor="address">Address:</label>
										<textarea
											type="text"
											name="address"
											className="form-control"
											onChange={(event) => this.setState({ address: event.target.value })}
											required></textarea>
									</div>
									<div className="form-group">
										<label htmlFor="notes">Notes:</label>
										<textarea
											type="text"
											name="notes"
											className="form-control"
											onChange={(event) => this.setState({ notes: event.target.value })}
											></textarea>
									</div>
									<div className="form-group">
										<label htmlFor="agencies">Associated Agencies:</label>
										<input
											name="agencies"
											className="form-control"
											onChange={(event) => this.setState({ agencies: event.target.value })}
											/>
									</div>
									<div className="form-group">
										<label htmlFor="pic">Picture:</label>
										<input
											type="file"
											name="pic"
											className="form-control"
											accept="image/*"
											onChange={this.handlePic}/>
									</div>
									<div className="form-check">
										<input
											type="checkbox"
											className="form-check-input"
											onChange={(event) => this.setState({ public: event.target.checked })}
											id="public" />
										<label
											className="form-check-label"
											htmlFor="public">Should this person's information be public?</label>
									</div>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-primary"
										onClick={this.addMember}
										data-dismiss="modal">
										Save
									</button>
									<button
										type="button"
										className="btn btn-primary"
										data-dismiss="modal">
										Close
									</button>
								</div>
							</div>
						</div>
					</div>

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