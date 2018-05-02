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
								<i class="fa fa-list-ul"></i>
							</Button>
							<Button
								onClick={this.toggleOrganization}
								disabled={this.state.org === "cards"}
								bsStyle={this.state.org === "cards" ? "primary" : "default"} >
								<i class="fa fa-th-large"></i>
							</Button>
						</div>
						<div>
							<Button
								className="btn btn-success"
								data-toggle="modal"
								data-target={this.props.addModalId}>
								<i className="fa fa-plus"></i> {this.props.newItemName}
							</Button>
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
