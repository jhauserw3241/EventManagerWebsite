import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { Button } from 'react-bootstrap';
import fire from './../../fire';

class EditProductModal extends Component {
    constructor(props) {
		super(props);

        this.state = {
			id: this.props.id,
			name: "",
			type: "",
			color: "",
        };

		this.editProduct = this.editProduct.bind(this);
		this.changeProductColor = this.changeProductColor.bind(this);
	}
	
	componentDidMount() {
		var self = this;

		// Get current event object
		fire.database().ref("products").child(this.props.id).once("value", function(data) {
			var event = data.val() ? data.val() : {};
			self.setState({
				name: event.name,
				type: event.type,
				color: event.color,	
			});
		});
	}
	
	editProduct(event) {
		event.preventDefault();

		var self = this;

		// Edit event component
		var updates = {};
		updates['/products/' + self.props.id + '/name'] = self.state.name;
		updates['/products/' + self.props.id + '/type'] = self.state.type;
		updates['/products/' + self.props.id + '/color'] = self.state.color;
        fire.database().ref().update(updates);
	}

	changeProductColor = (color) => {
	  this.setState({ color: color.hex });
	};

	render() {
        return (
			<div
				className="modal fade"
				id="editProductModal"
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
				aria-labelledby="editProductModalTitle"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="editProductModalTitle">Edit Product</h5>
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
									value={this.state.name}
									onChange={(event) => this.setState({ name: event.target.value })}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="type">Type:</label>
								<select
									name="type"
									className="form-control"
									value={this.state.type}
									onChange={(event) => this.setState({ type: event.target.value })}
									required>
									<option>Not Specified</option>
									<option>Publication</option>
									<option>Video</option>
									<option>Webinar</option>
									<option>Miscellaneous</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="color">Color:</label>
								<SketchPicker
									color={this.state.color}
									onChangeComplete={ this.changeProductColor } />
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
								data-dismiss="modal"
								onClick={this.editProduct}>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EditProductModal;