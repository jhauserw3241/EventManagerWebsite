import React, { Component } from 'react';
import AgencyCard from './AgencyCard';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import fire from './../../fire';
import './../../CSS/Modal.css';

class Agencies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			agencies: [],
			formError: "",
		};
	}
	
	componentDidMount() {
		var agenciesRef = fire.database().ref("agencies");
		agenciesRef.on("value", (data) =>
			this.setState({ agencies: data.val() ? Object.values(data.val()) : [] }));
	}
	
	render() {
		return (
			<div className="Agencies">
				<div className="container">
					{ (this.state.formError !== "") ?
						<div class="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<div className="list-container">
						{this.state.agencies.map(person =>
							<AgencyCard
								key={person.id}
								id={person.id}
								name={person.name}
								color={person.color} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Agencies;