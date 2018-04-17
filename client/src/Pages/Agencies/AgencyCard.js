import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Card.css';

class AgencyCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
        }
    }

    componentDidMount() {
        var self = this;
        var people_names = [];

        // Get a list of associated people
        fire.database().ref("users").once("value", function(data) {
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

	render() {
		var cardImgStyle = {
            backgroundImage: `url(${this.props.pic})`
		}

		return (
			<div className="AgencyCard people-card">
                <div
                    className="modal fade"
                    id={"agencyInfoModal-" + this.props.id}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="agencyInfoModalTitle"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="agencyInfoModalTitle">Person Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={this.props.name}
                                        disabled={true}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="aliases">Aliases:</label>
                                    <input
                                        type="text"
                                        name="aliases"
                                        className="form-control"
                                        value={this.props.aliases.join(", ")}
                                        disabled={true}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="people">Associated People:</label>
                                    <input
                                        name="people"
                                        className="form-control"
                                        value={this.state.people.join(", ")}
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
                    data-target={"#agencyInfoModal-" + this.props.id}></div>
				<div
                    className="people-card-text"
                    data-toggle="modal"
                    data-target={"#agencyInfoModal-" + this.props.id}>
                    <strong>{this.props.name}</strong>
				</div>
			</div>
		);
	}
}

export default AgencyCard;
