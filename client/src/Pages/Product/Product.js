import React, { Component } from 'react';
import ProductComponentTypeCard from './ProductComponentTypeCard';
import ProductPartnersComponentCard from './ProductPartnersComponentCard';
import EditProductModal from './EditProductModal';
import AddProductComponentModal from './AddProductComponentModal';
import AddProductPartnerModal from './AddProductPartnerModal';
import { Button } from 'react-bootstrap';
import fire from './../../fire';
import './../../CSS/Card.css';
import './../../CSS/Event.css';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product_id: this.props.match.params.id,
			product_name: "",
			product_type: "",
			owner_id: "",
			product_color: "",
			product_archived: false,
			component_types: [
				{type: "agenda", name: "Agenda(s)"},
				{type: "budget", name: "Budget(s)"},
				{type: "meetingNotes", name: "Meeting Notes"},
				{type: "other", name: "Other"}],
			components: [],
			people: [],
			event_partners: [],
        };

		this.canEditProduct = this.canEditProduct.bind(this);
		this.archiveProduct = this.archiveProduct.bind(this);
    }

    componentDidMount() {
        var self = this;

		// Get information about this event
        fire.database().ref("products").child(self.state.product_id).on("value", function(data) {
            var product = data.val() ? data.val() : {};
            self.setState({
				product_name: product.name,
				product_type: product.type,
				owner_id: product.owner_id,
				components: product.components ? Object.values(product.components) : [],
				product_color: product.color,
				product_archived: product.archived ? product.archived : false,
				partners: product.partners ? product.partners : {},
            });
		});
	}
	
	canEditProduct() {
		if(!fire.auth().currentUser) {
			return false;
		}

		var cur_user_id = fire.auth().currentUser.uid;

		// Check if the user is the event owner
		if(cur_user_id === this.state.owner_id) {
			return true;
		}

		// Check if the user is a partner with edit privileges
		for(var partner_id in this.state.partners) {
			var partner = this.state.partners[partner_id];
			if(cur_user_id === partner_id) {
				return (partner.priv === "Edit") || (partner.priv === "Owner");
			}
		}

		return false;
	}

	archiveProduct(archive) {
		var updates = {};
		updates["/products/" + this.state.product_id + "/archived"] = archive;
		fire.database().ref().update(updates);
	}

	render() {
        return (
			<div className="Product">
				<EditProductModal id={this.state.product_id} />

				<AddProductComponentModal product_id={this.state.product_id} />

				<AddProductPartnerModal product_id={this.state.product_id} />

                <div className="container">
                    <div className="content">
						<div
							className="project-mod-btns">
							{(this.state.product_archived) ?
								<Button 
									className="btn btn-success"
									onClick={() => this.archiveProduct(false)}>
									<i className="fa fa-folder-open"></i>
								</Button>
								: <Button
									className="btn btn-success"
									onClick={() => this.archiveProduct(true)}>
									<i className="fa fa-archive"></i>
								</Button>
							}
						</div>

						<div className="product-info">
							<div className="product-header">
								<div className="product-base-info">
									<h1>{this.state.product_name}</h1>
									<strong>Type:</strong> {this.state.product_type}
								</div>
							</div>
						</div>
						<div className="list-container">
							{this.canEditProduct() ?
								<div className="mod-btns">
									<Button
										className="btn btn-success"
										data-toggle="modal"
										data-target={"#addProductComponentModal-" + this.props.id}>
										<i className="fa fa-plus"></i> Component
									</Button>
									<Button
										className="btn btn-success"
										data-toggle="modal"
										data-target={"#addProductPartnerModal-" + this.props.id}>
										<i className="fa fa-plus"></i> Partner
									</Button>
									<Button
										className="btn btn-warning"
										data-toggle="modal"
										data-target={"#editProductModal"}>
										<i class="fa fa-edit"></i> Product
									</Button>
								</div> : null }
							{this.state.component_types.map(type =>
								<ProductComponentTypeCard
									type={type.type}
									name={type.name}
									product_id={this.state.product_id}
									canEdit={this.canEditProduct} />
							)}
							<ProductPartnersComponentCard
								color="red"
								name="Partners"
								canEditProduct={this.canEditProduct}
								link={this.state.product_id + "/partners/"} />
						</div>
                    </div>
                </div>
			</div>
		);
	}
}

export default Product;