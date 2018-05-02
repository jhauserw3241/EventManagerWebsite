import React, { Component } from 'react';
import { handlePictureSelected } from './../Common/PictureHelper';
import fire from './../../fire';
import './../../CSS/Modal.css';

class AddPersonModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			address: "",
			notes: "",
			agencies: "",
			public: false,
		};

		this.addMember = this.addMember.bind(this);
		this.handleProfilePic = this.handleProfilePic.bind(this);
	}

	addMember() {
		var self = this;

		var user = fire.auth().currentUser;

		if(!user) {
			return;
		}

		var cur_member_id = user.uid;

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

    handleProfilePic(event) {
        event.preventDefault();

		handlePictureSelected(
			event,
			(url) => this.setState({ pic: url }),
			(error) => this.props.handleError(error),
			"Profiles");
    }
	
	render() {
		return (
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
									onChange={this.handleProfilePic}/>
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
		);
	}
}

export default AddPersonModal;