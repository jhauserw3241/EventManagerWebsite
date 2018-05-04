import React, { Component } from 'react';
import EditProductComponentModal from './EditProductComponentModal';
import fire from './../../fire';
import './../../CSS/Card.css';

class ProductComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product_id: this.props.match.params.product_id,
            product_owner_id: "",
            product_partners: {},
            component_id: this.props.match.params.component_id,
            component_type: "",
            name: "",
            content_type: "",
            file: "",
            url: "",
            color: "",
        };

        this.canEditComponent = this.canEditComponent.bind(this);
    }

    componentDidMount() {
        var self = this;

        // Get information about the product component
        var curProductRef = fire.database().ref("products").child(this.state.product_id);
        var curComponentRef = curProductRef.child("components").child(this.state.component_id);
		curComponentRef.on("value", function(data) {
            var component = data.val() ? data.val() : {};

            self.setState({
                component_type: component.component_type,
                name: component.name ? component.name : "Component",
                content_type: component.content_type,
                file: component.file,
                url: component.url,
                color: component.color,
            });
        });

        // Get information about the event
        fire.database().ref("products").child(this.state.product_id).on("value", function(data) {
            var product = data.val() ? data.val() : {};

            self.setState({
                product_owner_id: product.owner_id,
                product_partners: product.partners,
            });
        });
    }

    canEditComponent() {
        var user = fire.auth().currentUser;
        if(!user) {
            return false;
        }
		var cur_user_id = user.uid;

		// Check if the user is the event owner
		if(cur_user_id === this.state.product_owner_id) {
			return true;
		}

		// Check if the user is a partner with edit privileges
		for(var partner_id in this.state.product_partners) {
			var partner = this.state.product_partners[partner_id];
			if(cur_user_id === partner_id) {
				return (partner.priv === "Edit") || (partner.priv === "Owner");
			}
		}

		return false;
    }

	render() {
        return (
            <div className="ProductComponent">
                <EditProductComponentModal
                    product_id={this.state.product_id}
                    component_id={this.state.component_id}
                    component_type={this.state.component_type}
                    name={this.state.name}
                    content_type={this.state.content_type}
                    file={this.state.file}
                    url={this.state.url}
                    color={this.state.color} />

                <div className="container">
                    <div className="content">
                        <h1>{this.state.name}</h1>
                        {(this.canEditComponent()) ? 
                            <button
                            className="btn btn-warning"
                            data-toggle="modal"
                            data-target="#editProductComponentModal">Edit</button> : null }
                        {(this.state.content_type === "file") ?
                            <object
                                className="agenda-iframe"
                                data={this.state.file}>
                            </object>
                            : <iframe
                                className="agenda-iframe"
                                src={this.state.url}
                                title={this.props.id}
                                allowFullScreen></iframe> }
                    </div>
                </div>
            </div>
        );
	}
}

export default ProductComponent;