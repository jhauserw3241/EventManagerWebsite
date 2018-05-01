import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../CSS/Card.css';

class UserDashboardCard extends Component {
	render() {
		var cardImgStyle = {
            backgroundImage: `url(${this.props.pic})`
		}

		return (
			<Link className="UserDashboardCard people-card" to={this.props.link}>
				<div
                    className="people-card-img"
                    style={cardImgStyle}></div>
				<div className="people-card-text">
                    <strong>{this.props.name}</strong>
				</div>
			</Link>
		);
	}
}

export default UserDashboardCard;
