import React, { Component } from 'react';
import './../../CSS/Card.css';

class GeneralInfoElement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            completed_date: ""
        };
    }

	render() {
		return (
			<div className="GeneralInfoElement">
                <h3 className="section-header">General Info</h3>
                <label htmlFor="selected-event-type">Type:</label>
                <select name="selected-event-type" value={this.props.type}>
                    <option value="Conference">Conference</option>
                    <option value="Outreach">Outreach</option>
                </select><br />
                <br />
                <label htmlFor="completed-date">Completed Date:</label>
                <input type="text" name="completed-date" value={this.props.completed_date} />
			</div>
		);
	}
}

export default GeneralInfoElement;