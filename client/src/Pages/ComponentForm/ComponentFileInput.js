import React, { Component } from 'react';
import FileInput from './../Common/FileInput';
import {
	isEmptyString,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';
import fire from './../../fire';

class ComponentFileInput extends Component {
	render() {
        return (
			<div className="form-group">
				<label htmlFor="componentFile">File:</label>
				<FileInput
					handleSuccess={(url) => this.props.onChange ? this.props.onChange(url) : {}}
					handleError={(error) => this.props.onError ? this.props.onError(error) : {}}
					folderName="ComponentFiles"
					fieldName="file" />
			</div>
		);
	}
}

export default ComponentFileInput;