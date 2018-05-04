import React, { Component } from 'react';
import FileInput from './../Common/FileInput';
import fire from './../../fire';
import './../../CSS/Form.css';

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
            notes: "",
            pic: "https://firebasestorage.googleapis.com/v0/b/event-planner-website.appspot.com/o/Defaults%2Fprofile.png?alt=media&token=53565a4f-5e52-4837-a2e1-4f8ab8994e74",
            formError: "",
            redirect: false
        }

        this.signUp = this.signUp.bind(this);
    }

    componentDidMount() {
        var self = this;

        // Get user information
        var user = fire.auth().currentUser;

        // Return if the user isn't logged in
        if(!user) {
            return;
        }

        var userRef = fire.database().ref("users");
        userRef.on("value", function(data) {
            console.log(data.val())
            var person = data.val()[user.uid];
            console.log(person);
            self.setState({
                user: user,
                first_name: person.first_name,
                last_name: person.last_name,
                email: person.email,
                phone_number: person.phone_number,
                address: person.address,
                notes: person.notes,
                pic: person.pic,
            });
		});
    }

    signUp(event) {
        event.preventDefault();

        var self = this;

        // Update the user in the database
        var updates ={};
        updates['/users/' + self.state.user.uid + '/id'] = self.state.user.uid;
        updates['/users/' + self.state.user.uid + '/first_name'] = self.state.first_name;
        updates['/users/' + self.state.user.uid + '/last_name'] = self.state.last_name;
        updates['/users/' + self.state.user.uid + '/email'] = self.state.email;
        updates['/users/' + self.state.user.uid + '/phone_number'] = self.state.phone_number;
        updates['/users/' + self.state.user.uid + '/address'] = self.state.address;
        updates['/users/' + self.state.user.uid + '/notes'] = self.state.notes;
        updates['/users/' + self.state.user.uid + '/pic'] = self.state.pic;
        fire.database().ref().update(updates);

        self.setState({disabled: true});
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
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                value={this.state.first_name}
                                onChange={(event) => this.setState({first_name: event.target.value})}
                                disabled={this.state.disabled}
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
                                disabled={this.state.disabled}
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
                                disabled={this.state.disabled}
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
                                disabled={this.state.disabled}
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
                                disabled={this.state.disabled}
                                required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes">Notes:</label>
                            <textarea
                                type="text"
                                name="notes"
                                className="form-control"
                                value={this.state.notes}
                                onChange={(event) => this.setState({notes: event.target.value})}
                                disabled={this.state.disabled}
                                ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pic">Picture:</label>
                            <FileInput
                                handleSuccess={(url) => this.setState({ pic: url })}
                                handleError={(error) => this.setState({ formError: error })}
                                folderName="Profiles"
                                fieldName="pic"
                                disabled={this.state.disabled} />
                        </div>
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
                            onClick={this.signUp} /> }
                    </div>
                </div>
            </div>);
	}
}

export default Profile;
