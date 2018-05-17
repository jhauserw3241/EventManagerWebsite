import React, { Component } from 'react';
import {
    isEmptyString,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';

class TypeInput extends Component {
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
				<label htmlFor="type">Type:</label>
				<select
					name="type"
					className="form-control"
					value={this.props.value}
                    style={this.isValid() ? {} : invalidFieldStyle}
					placeholder="Type"
					onChange={(event) => this.props.onChange ? this.props.onChange(event.target.value) : {}}
					required>
					<option value="">Not Specified</option>
					<option>Publication</option>
					<option>Video</option>
					<option>Webinar</option>
					<option>Miscellaneous</option>
				</select>
			</div>
		);
	}
}

export default TypeInput;
