import React, { Component } from 'react';
import { validPlanningEnd } from './../Common/EventHelpers';
import {
    isEmptyString,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';

// CSS and JS for datetime picker	
import moment from './../../../node_modules/moment/moment';	
import "./../../../node_modules/react-datetime/css/react-datetime.css";
import DateTime from "./../../../node_modules/react-datetime/DateTime.js";

class PlanningEndInput extends Component {
	constructor(props) {
		super(props);

		this.isValid = this.isValid.bind(this);
	}

	isValid() {
		// Check if the errors should be shown
		if(!this.props.showErrors) {
			return true;
		}

		return !isEmptyString(this.props.value);
	}
	
	render() {
		return (
			<div className="form-group">
				<label htmlFor="planning-end">Planning End:</label>
				<DateTime
					name="planning-end"
					value={this.props.value}
					placeholder="Planning End"
					className={this.isValid() ? "valid-datetime-field" : "invalid-datetime-field" }
					onChange={(event) => this.props.onChange ? this.props.onChange(event._d) : {}}
					isValidDate={(current) => validPlanningEnd(
						this.props.planningStart,
						this.props.eventStart,
						this.props.eventEnd,
						current,
					)}
					required />
				<p style={this.isValid() ? validTipStyle : invalidTipStyle}>
					This field must be set to a valid date/time.
				</p>
			</div>
		);
	}
}

export default PlanningEndInput;
