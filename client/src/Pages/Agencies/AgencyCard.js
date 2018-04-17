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
            shared_events: [],
        }

        this.getAllAgencies = this.getAllAgencies.bind(this);
        this.getAssociatedAgencies = this.getAssociatedAgencies.bind(this);
        this.getSharedEvents = this.getSharedEvents.bind(this);
    }

    componentDidMount() {
        // Get a list of all the agencies names
        this.getAllAgencies();
        
        // Get a list of the agencies that the person is associated with
        this.getAssociatedAgencies();

        // Get the list of shared events for the person and the current user
        this.getSharedEvents();
    }

    getAllAgencies() {
        var self = this;
        fire.database().ref("agencies").on("value", function(data) {
            var agency_names = [];
            var agencies = data.val() ? Object.values(data.val()) : [];

            for(var agency_id in agencies) {
                var agency = agencies[agency_id];
                agency_names.push(agency.name);
            }

            self.setState({ all_agencies: agency_names });
        });
    }

    getAssociatedAgencies() {
        fire.database().ref("users").child(this.props.id).child("agencies").on("value", (data) =>
            this.setState({ person_agencies: data.val() ? Object.values(data.val()) : [] }));
    }

    getSharedEvents() {
        var self = this;

        var event_names = [];

        if(!fire.auth().currentUser) {
            return;
        }

        var cur_user_id = fire.auth().currentUser.uid;

        fire.database().ref("users").child(self.props.id).child("events").on("value", function(person_events_data) {
            var person_events = person_events_data.val() ? person_events_data.val() : {};

            fire.database().ref("users").child(cur_user_id).child("events").on("value", function(cur_user_events_data) {
                var cur_user_events = cur_user_events_data.val() ? cur_user_events_data.val() : {};

                console.log(self.props.first_name + " " + self.props.last_name);
                console.log(person_events);
                console.log(cur_user_events);

                for(var person_event_id in person_events) {
                    for(var cur_user_event_id in cur_user_events) {
                        // Check if the event is shared
                        if(person_event_id === cur_user_event_id) {
                            var event_name = cur_user_events[cur_user_event_id].name;
                            event_names.push(event_name);
                        }
                    }
                }

                console.log(event_names);
                self.setState({ shared_events: event_names });
            });
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
                                    <label htmlFor="events">Shared Events:</label>
                                    <input
                                        type="text"
                                        name="events"
                                        className="form-control"
                                        value={this.state.shared_events.join(", ")}
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
