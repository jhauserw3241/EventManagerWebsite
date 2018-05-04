import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { generateColor } from './../Common/Colors';
import fire from './../../fire';
import './../../CSS/Modal.css';

class AddProductModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			type: "",
		};

		this.addProduct = this.addProduct.bind(this);
	}
	
	addProduct(event) {
		event.preventDefault();

		if(!fire.auth().currentUser) {
			return;
		}

		var self = this;

		var owner_id = fire.auth().currentUser.uid;
		fire.database().ref("users").child(owner_id).once("value", function(data) {
			var user = data.val();
			var user_name = user.first_name + " " + user.last_name;

			var partnersList = {};
			partnersList[owner_id] = {
				name: user_name,
				role: "Owner",
				priv: "Owner",
			}

			// Create event
			var curProductRef = fire.database().ref("products").push();
			var product_id = curProductRef.key;
			curProductRef.set({
				id: product_id,
				name: self.state.name,
				type: self.state.type,
				owner_id: owner_id,
				partners: partnersList,
				color: generateColor(),
			})
			.then(function() {
				// Reset event component fields to be the defaults
				self.setState({
					id: "",
					name: "",
					type: "",
					owner_id: "",
					partners: [],
					color: "",
				});
			});

			// Add this product to the list of products that is being tracked for the current user
			var updates = {};
			updates['/users/' + owner_id + '/products/' + product_id] = product_id;
			fire.database().ref().update(updates);
		});
	}
	
	render() {
		if(!fire.auth().currentUser) {
			return(<Redirect to="/" />);
		}

		return (
			<div
				className="modal fade"
				id="addProductModal"
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
				aria-labelledby="addProductModalTitle"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addProductModalTitle">Add Product</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="name">Name:</label>
								<input
									type="text"
									name="name"
									className="form-control"
									onChange={(event) => this.setState({name: event.target.value})}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="type">Type:</label>
								<select
									name="type"
									className="form-control"
									onChange={(event) => this.setState({type: event.target.value})}
									required>
									<option>Not Specified</option>
									<option>Publication</option>
									<option>Video</option>
									<option>Webinar</option>
									<option>Miscellaneous</option>
								</select>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
								data-dismiss="modal"
								onClick={this.addProduct}>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddProductModal;
