import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Card.css';

class ProductComponentCard extends Component {
	constructor(props) {
		super(props);

		this.deleteComponent = this.deleteComponent.bind(this);
	}

	deleteComponent(event) {
		event.preventDefault();

		// Create event
		fire.database().ref("products").child(this.props.product_id).child("components").child(this.props.component_id).remove();
	}

	render() {
		var cardImgStyle = {
			"backgroundColor": this.props.color
		};

		return (
			<Link className="ProductComponentCard side-card" to={this.props.link}>
				<div className="side-card-img" style={cardImgStyle}></div>
				<div className="side-card-text">
					{this.props.name}
				</div>
				{(this.props.canEditProduct()) ?
					<div className="side-card-btns">
						<button
							className="btn btn-danger card-delete-btn"
							onClick={this.deleteComponent}>
							<i class="fa fa-trash"></i>
						</button>
					</div> : null }
			</Link>
		);
	}
}

export default ProductComponentCard;
