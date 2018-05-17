import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { generateColor } from './../Common/Colors';
import Overlay from './../Common/Overlay';
import NameInput from './../ProductForm/NameInput';
import TypeInput from './../ProductForm/TypeInput';
import fire from './../../fire';
import { isEmptyString } from './../Common/FormValidation';

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

		// Check if the user is logged in
		var owner = fire.auth().currentUser;
		if(!owner) {
			return;
		}

		var self = this;

		fire.database().ref("users").child(owner.uid).once("value", function(data) {
			var user = data.val();
			var user_name = user.first_name + " " + user.last_name;

			var partnersList = {};
			partnersList[owner.uid] = {
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
				owner_id: owner.uid,
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
			updates['/users/' + owner.uid + '/products/' + product_id] = product_id;
			fire.database().ref().update(updates);
		});

		this.props.updateModalVisibility(false);
	}
	
	render() {
		if(!fire.auth().currentUser) {
			return(<Redirect to="/" />);
		}

		return (
			<Overlay
				id="addProductModal"
				title="Add Product"
				visible={this.props.visible}
				updateModalVisibility={this.props.updateModalVisibility}>
				<div className="modal-body">
					<NameInput
						value={this.state.name}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({name: value})} />
					<TypeInput
						value={this.state.type}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({type: value})} />
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-primary"
						onClick={this.addProduct}>
						Submit
					</button>
				</div>
			</Overlay>
		);
	}
}

export default AddProductModal;
