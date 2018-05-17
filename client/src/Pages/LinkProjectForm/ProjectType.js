import React, { Component } from 'react';
import Overlay from './../Common/Overlay';
import {
    isEmptyString,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';
import fire from './../../fire';

class ProjectType extends Component {
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
				<label htmlFor="projectType">Project Type:</label>
				<select
					type="text"
					name="projectType"
					className="form-control"
					value={this.props.value}
                    style={this.isValid() ? {} : invalidFieldStyle }
					placeholder="Project Type"
					onChange={(event) => this.props.onChange ? this.props.onChange(event.target.value) : {}}
					disabled={this.props.disabled ? this.props.disabled : false}
					required>
					<option value="">Not Specified</option>
					<option value="event">Event</option>
					<option value="product">Product</option>
				</select>
                <p style={this.isValid() ? validTipStyle : invalidTipStyle}>
                    This field must have a specified value.
                </p>
			</div>
		);
	}
}

export default ProjectType;