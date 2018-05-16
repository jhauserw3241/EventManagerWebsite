import React, { Component } from 'react';
import {
	isEmptyString,
	invalidFieldStyle,
	validTipStyle,
	invalidTipStyle,
} from './../Common/FormValidation';

class NameInput extends Component {
	constructor(props) {
		super(props);
		
		this.isValid = this.isValid.bind(this);
	}

	isValid() {
		if(!this.props.showErrors) {
			return true;
		}

		return !isEmptyString(this.props.value);
	}
	
	render() {
		return (
			<div className="form-group">
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					name="name"
					className="form-control"
					value={this.props.value}
					placeholder="Name"
                    style={this.isValid() ? {} : invalidFieldStyle }
					onChange={(event) =>
						this.props.onChange ? this.props.onChange(event.target.value) : {}}
					disabled={this.props.disabled ? this.props.disabled : false}
					required />
				<p style={this.isValid() ? validTipStyle : invalidTipStyle}>
					This field cannot be empty.
				</p>
			</div>
		);
	}
}

export default NameInput;
