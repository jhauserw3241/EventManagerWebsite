import React, { Component } from 'react';
import FileInput from './../Common/FileInput';

class PicInput extends Component {
	render() {
        return (
			<div className="form-group">
				<label htmlFor="pic">Picture:</label>
				<FileInput
					handleSuccess={(url) =>
						this.props.onChange ? this.props.onChange(url) : {}}
					handleError={(error) =>
						this.props.onError ? this.props.onError(error) : {}}
					folderName="Agencies"
					fieldName="pic" />
			</div>
		);
	}
}

export default PicInput;