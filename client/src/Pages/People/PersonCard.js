import React, { Component } from 'react';
import PersonInfoModal from './PersonInfoModal';
import './../../CSS/Card.css';

class PersonCard extends Component {
	render() {
		var cardImgStyle = {
            backgroundImage: `url(${this.props.pic})`
            }
            
            console.log(this.props.pic);

		return (
			<div className="PersonCard people-card">
                  <PersonInfoModal
                        key={this.props.id}
                        id={this.props.id}
                        first_name={this.props.first_name}
                        last_name={this.props.last_name}
                        email={this.props.email}
                        phone_number={this.props.phone_number}
                        address={this.props.address}
                        notes={this.props.notes}
                        pic={this.props.pic}
                        color={this.props.color} />

                  <div
                        className="people-card-img"
                        style={cardImgStyle}
                        data-toggle="modal"
                        data-target={"#personInfoModal-" + this.props.id}></div>
                  <div
                        className="people-card-text"
                        data-toggle="modal"
                        data-target={"#personInfoModal-" + this.props.id}>
                        <strong>{this.props.first_name} {this.props.last_name}</strong><br />
                        {this.props.email}<br />
                        {this.props.phone_number}
                  </div>
			</div>
		);
	}
}

export default PersonCard;
