import React, { Component } from 'react';
import ProductComponentTypeModal from './../ProductComponentTypeModal/ProductComponentTypeModal';
import fire from './../../fire';
import './../../CSS/Card.css';

class ProductComponentTypeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
			components: {},
			color: "",
		};
		
		this.deleteProductComponent = this.deleteProductComponent.bind(this);
    }

    componentDidMount() {
		var self = this;
		
		var user = fire.auth().currentUser;
		if(!user) {
			return;
		}

        fire.database().ref("products").child(self.props.product_id).child("components").on("value", function(data) {
			var components = data.val() ? data.val() : {};
			var filteredComponents = {};

			// Get the components of the specified type
			for(var component_id in components) {
				var component = components[component_id];
				if(component.component_type === self.props.type) {
					filteredComponents[component_id] = component;
				}
			}

			self.setState({ components: filteredComponents });
		});

		// Get the default colors that match the specified type
		var colorRef = fire.database().ref("users").child(user.uid).child("settings").child(this.props.type + "_color");
		colorRef.once("value", (data) =>
			this.setState({ color: data.val() ? data.val() : "green" }));
	}

	deleteProductComponent(event, component_id) {
		event.preventDefault();

		fire.database().ref("products").child(this.props.product_id).child("components").child(component_id).remove();
	}

	render() {
		// Check if there are no components for this component type
		if(Object.keys(this.state.components).length === 0) {
			return null;
		}

		return (
			<div
				className="ProductComponentCard side-card"
				data-target={"#productComponentTypeModal-" + this.props.type}
				data-toggle="modal">
				<ProductComponentTypeModal
					product_id={this.props.product_id}
					component_type={this.props.type}
					components={this.state.components}
					canEdit={this.props.canEdit}
					deleteProductComponent={this.deleteProductComponent} />
				<div className="side-card-img" style={{ backgroundColor: this.state.color }}></div>
				<div className="side-card-text">
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default ProductComponentTypeCard;
