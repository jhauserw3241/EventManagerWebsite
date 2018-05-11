import React, { Component } from 'react';
import {
    isEmptyString,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';

class AddressInput extends Component {
    constructor(props) {
        super(props);

        this.isValid = this.isValid.bind(this);
    }

    isValid() {
        var text = this.props.value;
        return !isEmptyString(text);
    }

	render() {
        return (
            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                    type="text"
                    name="address"
                    className="form-control"
                    value={this.props.value}
                    style={this.isValid() ? {} : invalidFieldStyle}
                    placeholder="Address"
                    onChange={(event) => this.props.onChange(event.target.value)}
                    required></textarea>
                <p style={this.isValid() ? validTipStyle : invalidTipStyle}>
                    This field cannot be empty.
                </p>
            </div>
        );
	}
}

export default AddressInput;
