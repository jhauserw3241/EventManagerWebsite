import React, { Component } from 'react';
import ItemsDashboard from './../ItemsDashboard/ItemsDashboard';
import AddProductModal from './AddProductModal';
import { Redirect } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Modal.css';

class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: {},
			formError: ""
		};

		this.deleteProduct = this.deleteProduct.bind(this);
	}
	
	componentDidMount() {
		var self = this;

		// Verify that the user is logged in
		if(!fire.auth().currentUser) {
			return;
		}
		var user_id = fire.auth().currentUser.uid;

		// Get all the projects that the current user is the owner of
		var productsRef = fire.database().ref("products");
		productsRef.on("value", function(data) {
			var products = data.val() ? data.val() : {};

			var temp = {};
			for(var product_id in products) {
				var product = products[product_id];

				// Check if user is owner
				if(product.owner_id === user_id) {
					temp[product.id] = product;
				}

				// Check if user is a event partner
				var partners = product.partners ? product.partners : [];
				if(user_id in partners) {
					temp[product.id] = product;
				}
			}
			self.setState({ products: temp });
		});
	}

	deleteProduct(event, id) {
		event.preventDefault();

		var curProductRef = fire.database().ref("products").child(id);
		curProductRef.remove()
		.catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
		});
	}
	
	render() {
		if(!fire.auth().currentUser) {
			return(<Redirect to="/" />);
		}

		return (
			<div className="Products">
				<div className="container">
					<AddProductModal />
	
					{ (this.state.formError !== "") ?
						<div class="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<ItemsDashboard
						dashboardName="Products"
						newItemName="Product"
						linkPrefix="/product/"
						addModalId="#addProductModal"
						items={this.state.products}
						deleteItem={this.deleteProduct} />
				</div>
			</div>
		);
	}
}

export default Products;
