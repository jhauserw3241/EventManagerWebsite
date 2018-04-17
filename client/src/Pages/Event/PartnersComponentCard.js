import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Card.css';

class PartnersComponentCard extends Component {
	render() {
		var cardImgStyle = {
			"backgroundColor": this.props.color
		};

		return (
			<Link className="PartnersComponentCard card" to={this.props.link}>
				<div className="card-img" style={cardImgStyle}></div>
				<div className="card-text">
					{this.props.name}
				</div>
				{(this.props.canEditEvent()) ?
					<div className="card-btns">
					</div> : null }
			</Link>
		);
	}
}

export default PartnersComponentCard;
