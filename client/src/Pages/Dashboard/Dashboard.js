import React, { Component } from 'react';
import DashboardCard from './DashboardCard';
import fire from './../../fire';
import './../../CSS/Modal.css';

class Dashboard extends Component {
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
			<div className="Dashboard">
				<div className="container">
					{ (this.state.formError !== "") ?
						<div class="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<div className="list-container">
						<DashboardCard
							key={0}
							name="Profile"
							pic={this.state.member.pic}
							link="/profile" />
						<DashboardCard
							key={1}
							name="Member Approval"
							pic="https://firebasestorage.googleapis.com/v0/b/event-planner-website.appspot.com/o/Defaults%2Fprofile.png?alt=media&token=53565a4f-5e52-4837-a2e1-4f8ab8994e74"
							link="/memberapproval" />
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;