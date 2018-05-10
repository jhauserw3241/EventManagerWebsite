import React, { Component } from 'react';
import AgencyTags from './../Common/PersonAgencyTags';
import EventTags from './PersonEventTags';
import './../../CSS/Card.css';

class PersonInfoModal extends Component {
	render() {
		return (
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
                                    disabled={true}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name:</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    value={this.props.last_name}
                                    disabled={true}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={this.props.email}
                                    disabled={true}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number">Phone Number:</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    className="form-control"
                                    value={this.props.phone_number}
                                    disabled={true}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <textarea
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={this.props.address}
                                    disabled={true}
                                    required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="agencies">Associated Agencies:</label>
                                <AgencyTags
                                    id={this.props.id}
                                    readOnly={true} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="events">Shared Events:</label>
                                <EventTags
                                    id={this.props.id}
                                    readOnly={true} />
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
		);
	}
}

export default PersonInfoModal;
