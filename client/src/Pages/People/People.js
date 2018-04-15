import React, { Component } from 'react';
import PersonCard from './PersonCard';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import fire from './../../fire';
import './../../CSS/Modal.css';

class People extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			formError: "",
		};
	}
	
	componentDidMount() {
		var usersRef = fire.database().ref("users");
		usersRef.orderByChild("name").on("value", (data) =>
			this.setState({ users: data.val() ? Object.values(data.val()) : [] }));
	}
	
	render() {
		return (
			<div className="People">
				<div className="container">
					{ (this.state.formError !== "") ?
						<div class="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<div className="list-container">
						{this.state.users.map(person =>
							<PersonCard
								key={person.id}
								id={person.id}
								first_name={person.first_name}
								last_name={person.last_name}
								email={person.email}
								phone_number={person.phone_number}
								address={person.address}
								notes={person.notes}
								pic={person.pic}
								color={person.color} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default People;