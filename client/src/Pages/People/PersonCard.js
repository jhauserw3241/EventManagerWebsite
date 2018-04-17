import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Card.css';

class PersonCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            all_agencies: [],
            person_agencies: [],
            events: [],
        }

        this.getAllAgencies = this.getAllAgencies.bind(this);
        this.getAssociatedAgencies = this.getAssociatedAgencies.bind(this);
        this.getSharedEvents = this.getSharedEvents.bind(this);
    }

    componentDidMount() {
        this.getAllAgencies();
        this.getAssociatedAgencies();
        this.getSharedEvents();
    }

    getAllAgencies() {
        var self = this;
        fire.database().ref("agencies").on("value", function(data) {
            console.log(data.val());
            var agency_names = [];
            var agencies = data.val() ? Object.values(data.val()) : [];

            for(var agency_id in agencies) {
                var agency = agencies[agency_id];
                agency_names.push(agency.name);
            }

            console.log(agency_names);
            self.setState({ all_agencies: agency_names });
        });
    }

    getAssociatedAgencies() {
        var self = this;
        fire.database().ref("users").child(this.props.id).child("agencies").on("value", function(data) {
            console.log(data.val());
            self.setState({ person_agencies: data.val() ? Object.values(data.val()) : [] });
        });
    }

    getSharedEvents() {
        var self = this;
        fire.database().ref("users").child(this.props.id).child("events").on("value", function(data) {
            console.log(data.val());
            self.setState({ events: data.val() ? Object.values(data.val()) : [] });
        });
    }

	render() {
		var cardImgStyle = {
            backgroundImage: `url(${this.props.pic})`
		}

		return (
			<div className="PersonCard people-card">
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
                                    <label htmlFor="notes">Notes:</label>
                                    <textarea
                                        type="text"
                                        name="notes"
                                        className="form-control"
                                        value={this.props.notes}
                                        disabled={true}
                                        ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="agencies">Associated Agencies:</label>
                                    <input
                                        name="agencies"
                                        className="form-control"
                                        value={this.state.person_agencies.join(", ")}
                                        disabled={true}
                                        />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="events">Events:</label>
                                    <input
                                        type="text"
                                        name="events"
                                        className="form-control"
                                        value={this.state.events.join(", ")}
                                        disabled={true}
                                        />
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
