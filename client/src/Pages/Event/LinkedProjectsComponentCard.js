import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Card.css';

class LinkedProjectsComponentCard extends Component {
	constructor(props) {
        super(props);

        this.state = {
			color: "",
		};
    }

    componentDidMount() {
		var self = this;
		
		var user = fire.auth().currentUser;
		if(!user) {
			return;
		}

		// Get the default color
		var colorRef = fire.database().ref("users").child(user.uid).child("settings").child("linked_projects_color");
		colorRef.once("value", (data) =>
			this.setState({ color: data.val() ? data.val() : "blue" }));
	}

	render() {
		return (
			<Link className="LinkedProjectsComponentCard side-card" to={this.props.link}>
				<div className="side-card-img" style={{ backgroundColor: this.state.color }}></div>
				<div className="side-card-text">
					{this.props.name}
				</div>
				{(this.props.canEditEvent()) ?
					<div className="side-card-btns">
					</div> : null
				}
			</Link>
		);
	}
}

export default LinkedProjectsComponentCard;
