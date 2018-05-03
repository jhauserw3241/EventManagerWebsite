import React, { Component } from 'react';
import AgencyInfoModal from './AgencyInfoModal';
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
        console.log(this.props.pic);

		return (
			<div className="AgencyCard people-card">
                <AgencyInfoModal
                    id={this.props.id}
                    name={this.props.name} />

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
