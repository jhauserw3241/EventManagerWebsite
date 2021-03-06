import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Form.css';
import { formatAgencyTagsForDB } from './../Common/TagFunctionality';
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
import PasswordInput from './../UserForm/PasswordInput';
import PhoneNumberInput from './../UserForm/PhoneNumberInput';
import PicInput from './../UserForm/PicInput';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone_number: "",
            address: "",
            agencies: [],
            pic: "https://firebasestorage.googleapis.com/v0/b/event-planner-website.appspot.com/o/Defaults%2Fprofile.png?alt=media&token=53565a4f-5e52-4837-a2e1-4f8ab8994e74",
            formError: "",
            showErrors: false,
            redirect: false,
        }

        this.isFormValid = this.isFormValid.bind(this);
        this.signUp = this.signUp.bind(this);
        this.handleAgencyDelete = this.handleAgencyDelete.bind(this);
        this.handleAgencyAddition = this.handleAgencyAddition.bind(this);
        this.handleAgencyDrag = this.handleAgencyDrag.bind(this);
        this.handleAgencyTagClick = this.handleAgencyTagClick.bind(this);
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

        // Check the password
        if(isEmptyString(this.state.password) || !isPassword(this.state.password)) {
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

    signUp(event) {
        event.preventDefault();

        var self = this;

        // Verify that there are no errors on the form
        if(!this.isFormValid()) {
            this.setState({ showErrors: true });
            return;
        }

        // Add user if no problems
        if(this.state.formError === "") {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(function(data) {
                // Get info for current user
                var user = fire.auth().currentUser;

                // Add user information to firebase DB
                fire.database().ref('/users/' + user.uid)
                .set({
                    id: user.uid,
                    first_name: self.state.first_name,
                    last_name: self.state.last_name,
                    email: self.state.email,
                    phone_number: self.state.phone_number,
                    address: self.state.address,
                    agencies: formatAgencyTagsForDB(self.state.agencies),
                    pic: self.state.pic,
                    status: "pending member",
                }).catch(function(error) {
                    self.setState({ formError: error.code + ": " + error.message });
                });

                self.setState({redirect: true});

                // This is commented out for debug purposes
                // This will be officially added later on in the project
                /* user.sendEmailVerification().then(function() {
                    // Email sent.
                }).catch(function(error) {
                    // An error happened.
                });*/
            }).catch(function(error) {
                self.setState({ formError: error.code + ": " + error.message });
            });
        }
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

    handleAgencyTagClick(index) {
        // Do nothing
    }

	render() {
        var self = this;

        if(this.state.redirect) {
            return (
                <Redirect to="/home" />
            );
        }

        return (
            <div className="Signup">
                <div className="container">
                    <div className="content">
                        { (this.state.formError !== "") ?
                            <div className="alert alert-danger">
                                <strong>Error:</strong> {this.state.formError}
                            </div> : null }
                        <h1 className="form-header">Sign Up</h1>
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
                        <PasswordInput
                            password={this.state.password}
                            showErrors={this.state.showErrors}
                            confirmPassword={this.state.confirmPassword}
                            onChange={(text) => this.setState({ password: text })}
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
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="Submit"
                            onClick={this.signUp} />
                    </div>
                </div>
            </div>
        );
	}
}

export default Signup;
