import React, { Component } from 'react';
import {
    isEmptyString,
    isPhoneNumber,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';

class PhoneNumberInput extends Component {
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
        return !isEmptyString(text) && isPhoneNumber(text);
    }

	render() {
        return (
            <div className="form-group">
                <label htmlFor="phone_number">Phone Number:</label>
                <input
                    type="text"
                    name="phone_number"
                    className="form-control"
                    value={this.props.value}
                    style={this.isValid() ? {} : invalidFieldStyle}
                    placeholder="Phone Number"
                    onChange={(event) => this.props.onChange ? this.props.onChange(event.target.value) : {}}
                    disabled={this.props.disabled ? this.props.disabled : false}
                    required />
                <p style={this.isValid() ? validTipStyle : invalidTipStyle}>
                    This field cannot be empty and must be a valid phone number.
                </p>
            </div>
        );
	}
}

export default PhoneNumberInput;
