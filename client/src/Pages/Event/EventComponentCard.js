import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../CSS/Card.css';

class EventComponentCard extends Component {
	render() {
		var cardImgStyle = {
			"backgroundColor": this.props.color
		};

		return (
			<Link className="EventComponentCard card" to={this.props.link}>
                {this.props.children}

				<div className="card-img" style={cardImgStyle}></div>
				<div className="card-text">
					{this.props.name}
				</div>
				<div className="card-mod-btns">
				</div>
			</Link>
		);
	}
}

export default EventComponentCard;
