import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire from './../../fire';

class Signout extends Component {    
    componentDidMount() {
        fire.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Signout was successful");
        }).catch(function(error) {
            // An error happened.
            console.log(error.code + ": " + error.message);
        });
    }

	render() {
		return (
			<Redirect to='/home' />
		);
	}
}

export default Signout;
