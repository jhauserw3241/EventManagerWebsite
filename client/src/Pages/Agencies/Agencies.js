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
		fire.database().ref("agencies").on("value", (data) =>
			this.setState({ agencies: data.val() ? Object.values(data.val()) : [] }));
	}
	
	render() {
		if(!fire.auth().currentUser) {
			window.location = "/";
		}
		return (
			<div className="Agencies">
				<div className="container">
					{ (this.state.formError !== "") ?
						<div class="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<div className="list-container">
						{this.state.agencies.map(agency =>
							<AgencyCard
								key={agency.id}
								id={agency.id}
								name={agency.name}
								aliases={agency.alias}
								people_ids={agency.people ? Object.values(agency.people) : []}
								pic={agency.pic}
								color={agency.color} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Agencies;