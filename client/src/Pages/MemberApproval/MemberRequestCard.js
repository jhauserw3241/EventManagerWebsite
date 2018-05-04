import React, { Component } from 'react';
import AgencyTags from './../Common/PersonAgencyTags';
import fire from './../../fire';
import './../../CSS/Card.css';

class MemberRequestCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            all_agencies: [],
            person_agencies: [],
        }

        this.acceptMember = this.acceptMember.bind(this);
        this.declineMember = this.declineMember.bind(this);
        this.getAssociatedAgencies = this.getAssociatedAgencies.bind(this);
        this.handleAgencyTagClick = this.handleAgencyTagClick.bind(this);
    }

    componentDidMount() {        
        // Get a list of the agencies that the person is associated with
        this.getAssociatedAgencies();
    }

    acceptMember(event) {
        var updates = {};
        updates["users/" + this.props.id + "/status"] = "member";
        fire.database().ref().update(updates);
    }

    declineMember(event) {
        var updates = {};
        updates["users/" + this.props.id + "/status"] = "removed";
        fire.database().ref().update(updates);
    }

    getAssociatedAgencies() {
        fire.database().ref("users").child(this.props.id).child("agencies").on("value", (data) =>
            this.setState({ person_agencies: data.val() ? Object.values(data.val()) : [] }));
    }

    formatTags(list) {
        return list.map(item => {
            return {
                id: item,
                text: item
            };
        });
    }

    handleAgencyTagClick(index) {
        // Do nothing
    }

	render() {
        console.log(this.props.agencies);

		var cardImgStyle = {
            backgroundImage: `url(${this.props.pic})`
		}

		return (
			<div className="MemberApprovalCard people-card">
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
                                    <AgencyTags
                                        tags={this.formatTags(Object.values(this.props.agencies))}
                                        id={this.props.id}
                                        handleTagClick={this.handleAgencyTagClick} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={this.acceptMember}
                                    data-dismiss="modal">
                                    Accept
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.declineMember}
                                    data-dismiss="modal">
                                    Decline
                                </button>
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

export default MemberRequestCard;
