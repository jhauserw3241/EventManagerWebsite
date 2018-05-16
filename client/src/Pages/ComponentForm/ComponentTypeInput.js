import React, { Component } from 'react';
import FileInput from './../Common/FileInput';
import {
	isEmptyString,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';
import fire from './../../fire';

class ComponentTypeInput extends Component {
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
				<label htmlFor="componentType">Component Type:</label>
				<select
					name="componentType"
					className="form-control"
					value={this.props.value}
                    style={this.isValid() ? {} : invalidFieldStyle}
					placeholder="Component Type"
					onChange={(event) => this.props.onChange ? this.props.onChange(event.target.value) : {}}
					disabled={this.props.disabled ? this.props.disabled : false}
					required>
					<option value="">Not Specified</option>
					<option value="agenda">Agenda</option>
					<option value="budget">Budget</option>
					<option value="meetingNotes">Meeting Notes</option>
					<option value="other">Other</option>
				</select>
                <p style={this.isValid() ? validTipStyle : invalidTipStyle}>
                    This field must be specified.
                </p>
			</div>
		);
	}
}

export default ComponentTypeInput;