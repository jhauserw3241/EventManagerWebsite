import React, { Component } from 'react';
import {
	isEmptyString,
	invalidFieldStyle,
	validTipStyle,
	invalidTipStyle,
} from './../Common/FormValidation';

class TypeInput extends Component {
	constructor(props) {
		super(props);

		this.isValid = this.isValid.bind(this);
	}

	isValid() {
		// Check if errors should be shown
		if(!this.props.showErrors) {
			return true;
		}

		return !isEmptyString(this.props.value);
	}
	
	render() {
		return (
			<div className="form-group">
				<label htmlFor="type">Type:</label>
				<select
					name="type"
					className="form-control"
					value={this.props.value}
                    style={this.isValid() ? {} : invalidFieldStyle }
					placeholder="Type"
					onChange={(event) => this.props.onChange ? this.props.onChange(event.target.value) : {}}
					disabled={this.props.disabled ? this.props.disabled : false}
					required>
					<option value="">Not Specified</option>
					<option>Conference</option>
					<option>Field trip</option>
					<option>Training</option>
					<option>Site Visit</option>
					<option>Miscellaneous</option>
				</select>
                <p style={this.isValid() ? validTipStyle : invalidTipStyle}>
                    This field must have a specified value.
                </p>
			</div>
		);
	}
}

export default TypeInput;
