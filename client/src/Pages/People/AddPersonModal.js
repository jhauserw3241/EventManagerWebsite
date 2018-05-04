import React, { Component } from 'react';
import PersonAgencyTags from './../Common/PersonAgencyTags';
import { formatTagsForDatabase } from './../Common/TagHelper';
import FileInput from './../Common/FileInput';
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
			agencies: [],
			public: false,
		};

		this.addMember = this.addMember.bind(this);
		this.handleAgencyAddition = this.handleAgencyAddition.bind(this);
		this.handleAgencyDelete = this.handleAgencyDelete.bind(this);
		this.handleAgencyDrag = this.handleAgencyDrag.bind(this);
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
			agencies: formatTagsForDatabase(self.state.agencies),
			pic: self.state.pic,
			public: self.state.public,
			status: "placeholder",
			creator_id: cur_member_id,
		}).catch(function(error) {
			self.setState({ formError: error.code + ": " + error.message });
		});
	}

    handleAgencyDelete(i) {
		var tags = this.state.agencies.filter((tag, index) => index !== i);
		this.setState({ agencies: tags });
	}

	handleAgencyAddition(tag) {
		var tags = [...this.state.agencies, ...[tag]];
		this.setState({ agencies: tags });
	}

	handleAgencyDrag(tag, currPos, newPos) {
		const tags = [...this.state.agencies];
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		this.setState({ agencies: newTags });
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
								<PersonAgencyTags
									tags={this.state.agencies}
									shouldStore={false}
									handleDelete={this.handleAgencyDelete}
									handleAddition={this.handleAgencyAddition}
									handleDrag={this.handleAgencyDrag} />
							</div>
							<div className="form-group">
								<label htmlFor="pic">Picture:</label>
								<FileInput
									handleSuccess={(url) => this.setState({ pic: url })}
									handleError={(error) => this.setState({ formError: error })}
									folderName="Profiles"
									fieldName="pic" />
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