import React, { Component } from 'react';
import ComponentTypeTable from './../ComponentTypeTable/ComponentTypeTable';
import fire from './../../fire';

class ProductComponentTypeModal extends Component {
	render() {
		console.log(this.props.component_type)
        return (
            <div
                className="modal fade"
                id={"productComponentTypeModal-" + this.props.component_type}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="productComponentModalTitle"
                aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="productComponentModalTitle">Pick Product Component</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
                            <ComponentTypeTable
								item="product"
								item_id={this.props.product_id}
								components={this.props.components}
								canEdit={this.props.canEdit}
								deleteItem={this.props.deleteProductComponent} />
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-danger"
								data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductComponentTypeModal;