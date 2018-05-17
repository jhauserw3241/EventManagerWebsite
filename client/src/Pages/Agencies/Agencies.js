import React, { Component } from 'react';
import AgencyCard from './AgencyCard';
import AddAgencyModal from './AddAgencyModal';
import { Button } from 'react-bootstrap';
import fire from './../../fire';
import './../../CSS/Modal.css';

class Agencies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			agencies: [],
			formError: "",
			addModalVisible: false,
		};

		this.updateAddModalVisibility = this.updateAddModalVisibility.bind(this);
	}
	
	componentDidMount() {
		fire.database().ref("agencies").on("value", (data) =>
			this.setState({ agencies: data.val() ? Object.values(data.val()) : [] }));
	}

	updateAddModalVisibility(value) {
		this.setState({ addModalVisible: value });
	}
	
	render() {
		if(!fire.auth().currentUser) {
			window.location = "/";
		}
		return (
			<div className="Agencies">
				<div className="container">
					<AddAgencyModal
						visible={this.state.addModalVisible}
						updateModalVisibility={this.updateAddModalVisibility}
						onError={(error) => this.setState({ formError: error })} />

					{ (this.state.formError !== "") ?
						<div class="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<div className="mod-btns">
						<Button
							className="btn btn-success"
							onClick={() => this.updateAddModalVisibility(true)}>
							<i className="fa fa-plus"></i> Agency
						</Button>
					</div>

					<div className="list-container">
						{this.state.agencies.map(agency =>
							<AgencyCard
								key={agency.id}
								id={agency.id}
								name={agency.name}
								pic={agency.pic}
								visible={agency.id === this.props.match.params.id} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Agencies;