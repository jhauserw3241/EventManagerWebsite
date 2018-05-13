import React, { Component } from 'react';
import {
    isEmptyString,
    isEmail,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';

class EmailInput extends Component {
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
        return !isEmptyString(text) && isEmail(text);
    }

	render() {
        return (
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={this.props.value}
                    style={this.isValid() ? {} : invalidFieldStyle}
                    placeholder="Email"
                    onChange={(event) => this.props.onChange(event.target.value)}
                    required />
                <p style={this.isValid() ? validTipStyle : invalidTipStyle}>
                    This field cannot be empty and it must contain a valid email.
                </p>
            </div>
        );
	}
}

export default EmailInput;
