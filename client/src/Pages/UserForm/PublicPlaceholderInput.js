import React, { Component } from 'react';

class PublicPlaceholderInput extends Component {
	render() {
		return (
			<div className="form-check">
				<input
					type="checkbox"
					className="form-check-input"
					checked={this.props.value}
					onChange={(event) => this.props.onChange ? this.props.onChange(event.target.checked) : {}}
					disabled={this.props.disabled ? this.props.disabled : false} />
				<label
					className="form-check-label"
					htmlFor="public">
					Should this person's information be public?
				</label>
			</div>
		);
	}
}

export default PublicPlaceholderInput;