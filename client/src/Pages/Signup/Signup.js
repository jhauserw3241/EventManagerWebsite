import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Form.css';

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
            notes: "",
            pic: "https://firebasestorage.googleapis.com/v0/b/event-planner-website.appspot.com/o/Defaults%2Fprofile.png?alt=media&token=53565a4f-5e52-4837-a2e1-4f8ab8994e74",
            formError: "",
            redirect: false
        }

        this.signUp = this.signUp.bind(this);
        this.handlePic = this.handlePic.bind(this);
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
            console.log(fire.auth().currentUser);

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
                    notes: self.state.notes,
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
                                    onChange={(event) => this.setState({address: event.target.value})}
                                    required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="notes">Notes:</label>
                                <textarea
                                    type="text"
                                    name="notes"
                                    className="form-control"
                                    value={this.state.notes}
                                    onChange={(event) => this.setState({notes: event.target.value})}></textarea>
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
