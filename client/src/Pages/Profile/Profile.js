import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
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
        this.handlePic = this.handlePic.bind(this);

        //console.log("Start the signup class");
    }

    componentDidMount() {
        var self = this;

        // Get user information
        var user = fire.auth().currentUser;
        console.log(user);

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
        fire.database().ref('/users/' + self.state.user.uid)
        .set({
            id: self.state.user.uid,
            first_name: self.state.first_name,
            last_name: self.state.last_name,
            email: self.state.email,
            phone_number: self.state.phone_number,
            address: self.state.address,
            notes: self.state.notes,
            pic: self.state.pic,
        }).catch(function(error) {error
            self.setState({ formError: error.code + ": " + error.message });
        });

        self.setState({disabled: true});
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
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={this.state.address}
                                onChange={(event) => this.setState({address: event.target.value})}
                                disabled={this.state.disabled}
                                required />
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
                            <input
                                type="file"
                                name="pic"
                                className="form-control"
                                accept="image/*"
                                onChange={this.handlePic}
                                disabled={this.state.disabled}
                                />
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
