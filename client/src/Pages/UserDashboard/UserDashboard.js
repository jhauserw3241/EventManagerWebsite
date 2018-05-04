import React, { Component } from 'react';
import UserDashboardCard from './UserDashboardCard';
import fire from './../../fire';
import './../../CSS/Modal.css';

class UserDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			member: {},
			formError: "",
		};
	}

	componentDidMount() {
		if(!fire.auth().currentUser) {
			return;
		}

		var member_id = fire.auth().currentUser.uid;
		fire.database().ref("users").child(member_id).on("value", (data) =>
			this.setState({ member: data.val() ? data.val() : {} }));
	}
	
	render() {
		if(!fire.auth().currentUser) {
			window.location = "/";
		}
		return (
			<div className="UserDashboard">
				<div className="container">
					{ (this.state.formError !== "") ?
						<div class="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<div className="list-container">
						<UserDashboardCard
							key={0}
							name="Profile"
							pic={this.state.member.pic}
							link="/profile" />
						{(this.state.member.status === "admin") ?
						<UserDashboardCard
							key={1}
							name="Member Approval"
							pic="https://firebasestorage.googleapis.com/v0/b/event-planner-website.appspot.com/o/Defaults%2Fprofile.png?alt=media&token=53565a4f-5e52-4837-a2e1-4f8ab8994e74"
							link="/memberapproval" /> : null }
						<UserDashboardCard
							key={2}
							name="Aesthetic Settings"
							pic="https://firebasestorage.googleapis.com/v0/b/event-planner-website.appspot.com/o/Defaults%2Faesthetic_settings.png?alt=media&token=c083f7ae-77d7-4e30-b503-a42b219f62a9"
							link="/aestheticsettings" />
					</div>
				</div>
			</div>
		);
	}
}

export default UserDashboard;