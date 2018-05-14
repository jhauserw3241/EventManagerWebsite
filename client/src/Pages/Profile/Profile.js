import React, { Component } from 'react';
import FileInput from './../Common/FileInput';
import fire from './../../fire';
import './../../CSS/Form.css';
import {
    isEmptyString,
    isEmail,
    isPassword,
    isPhoneNumber,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';
import AddressInput from './../UserForm/AddressInput';
import AgenciesInput from './../UserForm/AgenciesInput';
import EmailInput from './../UserForm/EmailInput';
import FirstNameInput from './../UserForm/FirstNameInput';
import LastNameInput from './../UserForm/LastNameInput';
import PhoneNumberInput from './../UserForm/PhoneNumberInput';
import PicInput from './../UserForm/PicInput';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone_number: "",
            address: "",
            pic: "https://firebasestorage.googleapis.com/v0/b/event-planner-website.appspot.com/o/Defaults%2Fprofile.png?alt=media&token=53565a4f-5e52-4837-a2e1-4f8ab8994e74",
            formError: "",
            showErrors: false,
            redirect: false
        }

        this.isFormValid = this.isFormValid.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
    }

    componentDidMount() {
        var self = this;

        // Verify user is logged in
        var user = fire.auth().currentUser;
        if(!user) {
            return;
        }

        var userRef = fire.database().ref("users");
        userRef.on("value", function(data) {
            var person = data.val()[user.uid];
            self.setState({
                user: user,
                first_name: person.first_name,
                last_name: person.last_name,
                email: person.email,
                phone_number: person.phone_number,
                address: person.address,
                pic: person.pic,
            });
		});
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

    saveProfile(event) {
        event.preventDefault();

        if(!this.isFormValid()) {
            this.setState({ showErrors: true });
            return;
        }

        // Update the user in the database
        var updates ={};
        updates['/users/' + this.state.user.uid + '/id'] = this.state.user.uid;
        updates['/users/' + this.state.user.uid + '/first_name'] = this.state.first_name;
        updates['/users/' + this.state.user.uid + '/last_name'] = this.state.last_name;
        updates['/users/' + this.state.user.uid + '/email'] = this.state.email;
        updates['/users/' + this.state.user.uid + '/phone_number'] = this.state.phone_number;
        updates['/users/' + this.state.user.uid + '/address'] = this.state.address;
        updates['/users/' + this.state.user.uid + '/pic'] = this.state.pic;
        fire.database().ref().update(updates);

        this.setState({disabled: true});
    }

	render() {
        return (
            <div className="Profile">
                <div className="container">
                    <div className="content">
                        { (this.state.formError !== "") ?
                            <div className="alert alert-danger">
                                <strong>Error:</strong> {this.state.formError}
                            </div> : null }
                        <h1 className="form-header">Profile</h1>
                        <FirstNameInput
                            value={this.state.first_name}
                            showErrors={this.state.showErrors}
                            onChange={(text) => this.setState({ first_name: text })}
                            onError={(error) => this.setState({ formError: error })}
                            disabled={this.state.disabled} />
                        <LastNameInput
                            value={this.state.last_name}
                            showErrors={this.state.showErrors}
                            onChange={(text) => this.setState({ last_name: text })}
                            onError={(error) => this.setState({ formError: error })}
                            disabled={this.state.disabled} />
                        <EmailInput
                            value={this.state.email}
                            showErrors={this.state.showErrors}
                            onChange={(text) => this.setState({ email: text })}
                            onError={(error) => this.setState({ formError: error })}
                            disabled={this.state.disabled} />
                        <PhoneNumberInput
                            value={this.state.phone_number}
                            showErrors={this.state.showErrors}
                            onChange={(text) => this.setState({ phone_number: text })}
                            onError={(error) => this.setState({ formError: error })}
                            disabled={this.state.disabled} />
                        <AddressInput
                            value={this.state.address}
                            showErrors={this.state.showErrors}
                            onChange={(text) => this.setState({ address: text })}
                            onError={(error) => this.setState({ formError: error })}
                            disabled={this.state.disabled} />
                        <PicInput
                            value={this.state.pic}
                            showErrors={this.state.showErrors}
                            onChange={(text) => this.setState({ pic: text })}
                            onError={(error) => this.setState({ formError: error })}
                            disabled={this.state.disabled} />
                        {(this.state.disabled) ? 
                            <input
                            type="button"
                            className="btn btn-warning"
                            value="Edit"
                            onClick={(event) => this.setState({ disabled: false })} />
                            : <input
                            type="button"
                            className="btn btn-success"
                            value="Save"
                            onClick={this.saveProfile} /> }
                    </div>
                </div>
            </div>);
	}
}

export default Profile;
