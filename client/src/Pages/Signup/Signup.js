import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Form.css';
import AgencyTags from './../Common/PersonAgencyTags';
import FileInput from './../Common/FileInput';

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
            tags: [],
            pic: "https://firebasestorage.googleapis.com/v0/b/event-planner-website.appspot.com/o/Defaults%2Fprofile.png?alt=media&token=53565a4f-5e52-4837-a2e1-4f8ab8994e74",
            formError: "",
            redirect: false
        }

        this.signUp = this.signUp.bind(this);
        this.formatAgencyTagsForDB = this.formatAgencyTagsForDB.bind(this);
        this.handleAgencyDelete = this.handleAgencyDelete.bind(this);
        this.handleAgencyAddition = this.handleAgencyAddition.bind(this);
        this.handleAgencyDrag = this.handleAgencyDrag.bind(this);
        this.handleAgencyTagClick = this.handleAgencyTagClick.bind(this);
    }

    signUp(event) {
        event.preventDefault();

        var self = this;

        // Check passwords are the same
        if(this.state.password !== this.state.confirmPassword) {
            this.setState({formError: "Passwords don't match"});
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
                    agencies: self.formatAgencyTagsForDB(),
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

    formatAgencyTagsForDB() {
        /*
        var updatedTags = [];
        for(var tag_id in this.state.tags) {
            var tag = this.state.tags[tag_id];
            updatedTags[tag] = tag;
        }*/
        var updatedTags = this.state.tags.map(tag => {
            return tag.text;
        });
        return updatedTags;
    }

    handleAgencyDelete(i) {
      var tags = this.state.tags.filter((tag, index) => index !== i);
      this.setState({ tags: tags });
    }
  
    handleAgencyAddition(tag) {
      var tags = [...this.state.tags, ...[tag]];
      this.setState({ tags: tags });
    }
  
    handleAgencyDrag(tag, currPos, newPos) {
      const tags = [...this.state.tags];
      const newTags = tags.slice();
  
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      this.setState({ tags: newTags });
    }

    handleAgencyTagClick(index) {
        // Do nothing
    }

	render() {
        if(this.state.redirect) {
            return (
                <Redirect to="/home" />
            );
        } else {
            return (
                <div className="Signup">
                    <div className="container">
                        <div className="content">
                            { (this.state.formError !== "") ?
                                <div className="alert alert-danger">
                                    <strong>Error:</strong> {this.state.formError}
                                </div> : null }
                            <h1 className="form-header">Sign Up</h1>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name:</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    value={this.state.first_name}
                                    placeholder="First Name"
                                    onChange={(event) => this.setState({first_name: event.target.value})}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name:</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    value={this.state.last_name}
                                    placeholder="Last Name"
                                    onChange={(event) => this.setState({last_name: event.target.value})}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={this.state.email}
                                    placeholder="Email"
                                    onChange={(event) => this.setState({email: event.target.value})}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={this.state.password}
                                    placeholder="Password"
                                    onChange={(event) => this.setState({password: event.target.value})}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={this.state.confirmPassword}
                                    placeholder="Confirm Password"
                                    onChange={(event) => this.setState({confirmPassword: event.target.value})}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number">Phone Number:</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    className="form-control"
                                    value={this.state.phone_number}
                                    placeholder="Phone Number"
                                    onChange={(event) => this.setState({phone_number: event.target.value})}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <textarea
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={this.state.address}
                                    placeholder="Address"
                                    onChange={(event) => this.setState({address: event.target.value})}
                                    required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="agencies">Agencies:</label>
                                <AgencyTags
                                    tags={this.state.tags}
                                    shouldStore={false}
                                    handleDelete={this.handleAgencyDelete}
                                    handleAddition={this.handleAgencyAddition}
                                    handleDrag={this.handleAgencyDrags}
                                    handleTagClick={this.handleAgencyTagClick} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pic">Picture:</label>
                                <FileInput 
                                    handleSuccess={(url) => this.setState({ pic: url })}
                                    handleError={(error) => this.setState({ formError: error })}
                                    folderName="Profiles"
                                    fieldName="pic" />
                            </div>
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
}

export default Signup;
