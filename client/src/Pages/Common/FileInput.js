import React, { Component } from 'react';
import fire from './../../fire';

class FileInput extends Component {
	constructor(props) {
		super(props);

		this.handleFile = this.handleFile.bind(this);
    }
    
    handleFile(event) {
        event.preventDefault();
    
        // Get file from input field
        var file = event.target.files[0];
    
        // Get file name
        var file_name = this.props.fileName ? this.props.fileName : file.name;
    
        // Add the file to the Google Firebase storage
        var ref = fire.storage().ref(this.props.folderName).child(file_name);
        ref.put(file).then(()=>{
            ref.getDownloadURL().then((url) => {
                this.props.handleSuccess(url);
            }).catch((err) => {
                this.props.handleError(err.code + ": " + err.message);
            });
        }).catch((error) => {
            this.props.handleError(error.code + ": " + error.message);
        });
    }
	
	render() {
		return (
			<input
                type="file"
                name={this.props.fieldName}
                className="form-control"
                onChange={this.handleFile}
                disabled={this.props.disabled} />
		);
	}
}

export default FileInput;
