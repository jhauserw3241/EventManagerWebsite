import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../CSS/Card.css';

class PersonCard extends Component {
	render() {
		var cardImgStyle = {
			"backgroundColor": this.props.color
		};

		return (
			<div className="PersonCard card">
                <div className="modal fade" id="personInfoModal" tabIndex="-1" role="dialog" aria-labelledby="personInfoModalTitle" aria-hidden="true">
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
                                        value={this.props.first_name} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={this.props.last_name} />
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
                    data-target="#personInfoModal"></div>
				<div
                    className="card-text"
                    data-toggle="modal"
                    data-target="#personInfoModal">
                    {this.props.first_name} {this.props.last_name}
				</div>
			</div>
		);
	}
}

export default PersonCard;
