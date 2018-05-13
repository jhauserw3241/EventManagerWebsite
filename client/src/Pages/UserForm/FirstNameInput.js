import React, { Component } from 'react';
import {
    isEmptyString,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';

class FirstNameInput extends Component {
    constructor(props) {
        super(props);

        this.isValid = this.isValid.bind(this);
    }

    isValid() {
        // Hide errors if they aren't requested
        if(!this.props.showErrors) {
            return true;
        }

        var text = this.props.value;
        return !isEmptyString(text);
    }

	render() {
        return (
            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={this.props.value}
                    style={this.isValid() ? {} : invalidFieldStyle }
                    placeholder="First Name"
                    onChange={(event) => this.props.onChange(event.target.value)}
                    disabled={this.props.disabled ? this.props.disabled : false}
                    required />
                <p style={this.isValid() ? validTipStyle : invalidTipStyle}>
                    This field cannot be empty.
                </p>
            </div>
        );
	}
}

export default FirstNameInput;
