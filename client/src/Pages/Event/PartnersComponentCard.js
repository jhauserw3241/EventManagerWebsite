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
			<Link className="PartnersComponentCard side-card" to={this.props.link}>
				<div className="side-card-img" style={cardImgStyle}></div>
				<div className="side-card-text">
					{this.props.name}
				</div>
				<div className="side-card-btns">
				</div>
			</Link>
		);
	}
}

export default PartnersComponentCard;
