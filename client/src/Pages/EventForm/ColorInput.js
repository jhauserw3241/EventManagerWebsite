import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class ColorInput extends Component {
	render() {
        return (
			<div className="form-group">
				<label htmlFor="color">Color:</label>
				<SketchPicker
					color={this.props.value}
					onChangeComplete={ this.props.onChange ? this.props.onChange : {} } />
			</div>
		);
	}
}

export default ColorInput;