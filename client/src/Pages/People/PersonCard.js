import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../CSS/Card.css';

class PersonCard extends Component {
	render() {
        console.log(this.props.pic);

		var cardImgStyle = {
            backgroundImage: `url(${this.props.pic})`
		}

		return (
			<div className="PersonCard card">
                <div className="modal fade" id={"personInfoModal-" + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="personInfoModalTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="personInfoModalTitle">Person Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={this.props.first_name}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={this.props.last_name}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        value={this.props.email}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone_number">Phone Number:</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        className="form-control"
                                        value={this.props.phone_number}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address:</label>
                                    <textarea
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={this.props.address}
                                        required></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="notes">Notes:</label>
                                    <textarea
                                        type="text"
                                        name="notes"
                                        className="form-control"
                                        value={this.props.notes}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

				<div
                    className="card-img"
                    style={cardImgStyle}
                    data-toggle="modal"
                    data-target={"#personInfoModal-" + this.props.id}></div>
				<div
                    className="card-text"
                    data-toggle="modal"
                    data-target={"#personInfoModal-" + this.props.id}>
                    {this.props.first_name} {this.props.last_name}
				</div>
			</div>
		);
	}
}

export default PersonCard;
