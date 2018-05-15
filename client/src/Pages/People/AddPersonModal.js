import React, { Component } from 'react';
import PersonAgencyTags from './../UserForm/PersonAgencyTags';
import { formatTagsForDatabase } from './../Common/TagHelper';
import FileInput from './../Common/FileInput';
import fire from './../../fire';
import {
    isEmptyString,
    isEmail,
    isPassword,
    isPhoneNumber,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';
import Overlay from './../Common/Overlay';
import AddressInput from './../UserForm/AddressInput';
import AgenciesInput from './../UserForm/AgenciesInput';
import EmailInput from './../UserForm/EmailInput';
import FirstNameInput from './../UserForm/FirstNameInput';
import LastNameInput from './../UserForm/LastNameInput';
import PhoneNumberInput from './../UserForm/PhoneNumberInput';
import PicInput from './../UserForm/PicInput';
import PublicPlaceholderInput from './../UserForm/PublicPlaceholderInput';

class AddPersonModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			address: "",
			agencies: [],
			pic: "https://firebasestorage.googleapis.com/v0/b/event-planner-website.appspot.com/o/Defaults%2Fprofile.png?alt=media&token=53565a4f-5e52-4837-a2e1-4f8ab8994e74",
			public: false,
			showErrors: false,
		};

		this.addMember = this.addMember.bind(this);
		this.handleAgencyAddition = this.handleAgencyAddition.bind(this);
		this.handleAgencyDelete = this.handleAgencyDelete.bind(this);
		this.handleAgencyDrag = this.handleAgencyDrag.bind(this);
	}

	isFormValid() {
        // Check the first name
        if(isEmptyString(this.state.first_name)) {
            return false;
        }

        // Check the last name
        if(isEmptyString(this.state.last_name)) {
            return false;
        }

        // Check the email
        if(isEmptyString(this.state.email) || !isEmail(this.state.email)) {
            return false;
        }

        // Check the phone number
        if(isEmptyString(this.state.phone_number) || !isPhoneNumber(this.state.phone_number)) {
            return false;
        }

        // Check the address
        if(isEmptyString(this.state.address)) {
            return false;
        }

        return true;
	}

	addMember() {
		var self = this;

		// Check if a user is logged in
		var user = fire.auth().currentUser;
		if(!user) {
			return;
		}

		// Check if the fields are correctly formatted
		if(!this.isFormValid()) {
			this.setState({ showErrors: true });
			return;
		}

		// Add user with no account
		var newMemberRef = fire.database().ref("users").push();
		newMemberRef.set({
			id: newMemberRef.key,
			first_name: self.state.first_name,
			last_name: self.state.last_name,
			email: self.state.email,
			phone_number: self.state.phone_number,
			address: self.state.address,
			agencies: formatTagsForDatabase(self.state.agencies),
			pic: self.state.pic,
			public: self.state.public,
			status: "placeholder",
			creator_id: user.uid,
		}).catch(function(error) {
			self.setState({ formError: error.code + ": " + error.message });
		});

		this.props.updateAddModalVisibility(false);
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
			<Overlay
				id="addPersonModal"
				title="Add Placeholder Person"
				visible={this.props.visible}
				updateModalVisibility={this.props.updateAddModalVisibility}>
				<div className="modal-body">
					<FirstNameInput
						value={this.state.first_name}
						showErrors={this.state.showErrors}
						onChange={(text) => this.setState({ first_name: text })}
						onError={(error) => this.setState({ formError: error })} />
					<LastNameInput
						value={this.state.last_name}
						showErrors={this.state.showErrors}
						onChange={(text) => this.setState({ last_name: text })}
						onError={(error) => this.setState({ formError: error })} />
					<EmailInput
						value={this.state.email}
						showErrors={this.state.showErrors}
						onChange={(text) => this.setState({ email: text })}
						onError={(error) => this.setState({ formError: error })} />
					<PhoneNumberInput
						value={this.state.phone_number}
						showErrors={this.state.showErrors}
						onChange={(text) => this.setState({ phone_number: text })}
						onError={(error) => this.setState({ formError: error })} />
					<AddressInput
						value={this.state.address}
						showErrors={this.state.showErrors}
						onChange={(text) => this.setState({ address: text })}
						onError={(error) => this.setState({ formError: error })} />
					<AgenciesInput
						tags={this.state.agencies}
						handleDelete={this.handleAgencyDelete}
						handleAddition={this.handleAgencyAddition}
						handleDrag={this.handleAgencyDrag}
						handleTagClick={this.handleAgencyTagClick} />
					<PicInput
						value={this.state.first_name}
						showErrors={this.state.showErrors}
						onChange={(url) => this.setState({ pic: url })}
						onError={(error) => this.setState({ formError: error })} />
					<PublicPlaceholderInput
						value={this.props.public}
						onChange={(event) => this.setState({ public: event.target.checked})} />
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-primary"
						onClick={this.addMember}>
						Save
					</button>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() =>
							this.props.updateAddModalVisibility(false)}>
						Close
					</button>
				</div>
			</Overlay>
		);
	}
}

export default AddPersonModal;