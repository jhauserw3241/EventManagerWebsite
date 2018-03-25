import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Form.css';

class Login extends Component {
    constructor(props) {
		super(props);
		this.state = {
            redirect: false,
            authError: "",
			email: "",
            password: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        var self = this;

        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(function(firebaseUser) {
            // Handle user having logged in succesfully
            self.setState({ redirect: true });
        })
        .catch(function(error) {
            // Handle errors when trying to log in
            var errorCode = error.code;
            var errorMessage = error.message;
            switch(errorCode) {
                case 'auth/invalid-email':
                    self.setState({ authError: "Invalid email" });
                    break;
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    self.setState({ authError: "Incorrect email/password" });
                    break;
                default:
                    console.log("Error " + errorCode + ": " + errorMessage);
                    self.setState({ authError: errorMessage });
            }
        });
    }

	render() {
        if(this.state.redirect) {
            return (
                <Redirect to ="/home" />
            );
        } else  {
            return (
                <div className="Login">
                    <div className="container">
                        <div className="content">
                            { (this.state.authError !== "") ?
                                <div className="alert alert-danger">
                                    <strong>Error:</strong> {this.state.authError}
                                </div> : null }
    
                            <h1 className="form-header">Login</h1>
                            <form method="POST" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <label
                                        className="login-label"
                                        htmlFor="email">Email:</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className="login-input"
                                        onChange={(event) => this.setState({email: event.target.value})}
                                        required />
                                </fieldset>
                                <fieldset>
                                    <label
                                        className="login-label"
                                        htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="login-input"
                                        onChange={(event) => this.setState({password: event.target.value})}
                                        required />
                                </fieldset>
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
	}
}

export default Login;
