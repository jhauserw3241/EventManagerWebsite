import React, { Component } from 'react';
import AgencyInfoModal from './AgencyInfoModal';
import LoginRequired from './../Login/LoginRequired';
import fire from './../../fire';
import './../../CSS/Card.css';

class AgencyCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
        }

        this.deleteAgency = this.deleteAgency.bind(this);
    }

    componentDidMount() {
        var self = this;
        var people_names = [];

        // Get a list of associated people
        var usersRef = fire.database().ref("users");
        usersRef.once("value", function(data) {
            var people = data.val() ? data.val() : {};

            for(var index in self.props.people_ids) {
                var agency_person_id = self.props.people_ids[index];
                for(var person_id in people) {
                    if(agency_person_id === person_id) {
                        var person = people[person_id];
                        var name = person.first_name + " " + person.last_name;
                        people_names.push(name);
                        break;
                    }
                }
            }

            self.setState({ people: people_names });
        });
    }

    deleteAgency() {
        fire.database().ref("agencies").child(this.props.id).remove();
    }

	render() {
		return (
			<div className="AgencyCard people-card">
                <AgencyInfoModal
                    id={this.props.id}
                    name={this.props.name} />

                <div className="people-card-content">
                    <div
                        className="people-card-img"
                        style={{ backgroundImage: `url(${this.props.pic})` }}
                        data-toggle="modal"
                        data-target={"#agencyInfoModal-" + this.props.id}></div>
                    <div
                        className="people-card-text"
                        data-toggle="modal"
                        data-target={"#agencyInfoModal-" + this.props.id}>
                        <strong>{this.props.name}</strong>
                    </div>
                </div>
                <LoginRequired requiredRole="admin">
                    <div
                        className="people-card-btns">
                        <button
                            className="btn btn-danger"
                            onClick={this.deleteAgency}>
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </LoginRequired>
			</div>
		);
	}
}

export default AgencyCard;
