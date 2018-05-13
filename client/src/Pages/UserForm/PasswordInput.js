import React, { Component } from 'react';
import {
    isEmptyString,
    isMatch,
    isPassword,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';

class PasswordInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: this.props.password,
            password_updated: false,
            confirmPassword: this.props.confirmPassword,
        };

        this.updatePassword = this.updatePassword.bind(this);
        this.getFieldValue = this.getFieldValue.bind(this);
        this.isPasswordValid = this.isPasswordValid.bind(this);
        this.isConfirmPasswordValid = this.isConfirmPasswordValid.bind(this);
    }

    updatePassword(event) {
        var password = event.target.value;
        this.setState({ password: password });
        this.props.onChange(password);
    }

    getFieldValue(fieldName) {
        return ((   (this.state[fieldName] === undefined) || // Check if field value isn't set
                    (this.state[fieldName] === "")) &&
                (this.state[fieldName + "_updated"] === false)) ? // Check if field value hasn't been updated 
                this.props[fieldName] : this.state[fieldName];
    }

    isPasswordValid() {
        // Hide errors if they aren't requested
        if(!this.props.showErrors) {
            return true;
        }

        var text = this.props.password;
        return !isEmptyString(text) && isPassword(text);
    }

    isConfirmPasswordValid() {
        // Hide errors if they aren't requested
        if(!this.props.showErrors) {
            return true;
        }

        var text = this.state.confirmPassword;
        return isMatch(text, this.props.password);
    }

	render() {
        return (
            <div className="PasswordInput">
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={this.getFieldValue("password")}
                        style={this.isPasswordValid() ? {} : invalidFieldStyle}
                        placeholder="Password"
                        onChange={this.updatePassword}
                        disabled={this.props.disabled ? this.props.disabled : false}
                        required />
                    <p style={this.isPasswordValid() ? validTipStyle : invalidTipStyle}>
                        This field cannot be empty and must be a valid password.<br />
                        A valid password must contain at least eight characters. Two must
                        be digits, two must be capital letters, and two must be lower case letters.
                    </p>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        value={this.state.confirmPassword}
                        style={this.isConfirmPasswordValid() ? {} : invalidFieldStyle}
                        placeholder="Confirm Password"
                        onChange={(event) => this.setState({ confirmPassword: event.target.value })}
                        disabled={this.props.disabled ? this.props.disabled : false}
                        required />
                    <p style={this.isConfirmPasswordValid() ? validTipStyle : invalidTipStyle}>
                        This field does not match the password field.
                    </p>
                </div>
            </div>
        );
	}
}

export default PasswordInput;
