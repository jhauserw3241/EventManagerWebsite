import React, { Component } from 'react';
import ItemsList from './ItemsList';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import fire from './../../fire';
import './../../CSS/Modal.css';

class ItemsDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			org: "list",
		};

		this.toggleOrganization = this.toggleOrganization.bind(this);
	}

	toggleOrganization(event) {
		if(this.state.org === "list") {
			this.setState({ org: "cards" });
		} else {
			this.setState({ org: "list" });
		}
	}
	
	render() {
		if(!fire.auth().currentUser) {
			return(<Redirect to="/" />);
		}

		return (
			<div className="ItemsDashboard">
				<div className="container">
					<div className="mod-btns">
						<div className="org-btns">
							<Button
								onClick={this.toggleOrganization}
								disabled={this.state.org === "list"}
								bsStyle={this.state.org === "list" ? "primary" : "default"} >
								List
							</Button>
							<Button
								onClick={this.toggleOrganization}
								disabled={this.state.org === "cards"}
								bsStyle={this.state.org === "cards" ? "primary" : "default"} >
								Cards
							</Button>
						</div>
						<div>
							<Button data-toggle="modal" data-target={this.props.addModalId}>Add</Button>
						</div>
					</div>

					<ItemsList
						dashboardName={this.props.dashboardName}
						linkPrefix={this.props.linkPrefix}
						org={this.state.org}
						items={this.props.items}
						deleteItem={this.props.deleteItem} />
				</div>
			</div>
		);
	}
}

export default ItemsDashboard;
