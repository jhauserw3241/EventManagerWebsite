import React, { Component } from 'react';
import { generateColor } from './../Common/Colors';
import fire from './../../fire';

class AddComponentModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
			components: [],
			component_type: "",
			name: "",
			content_type: "",
			file: "",
			url: "",
        };

		this.addComponent = this.addComponent.bind(this);
		this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount() {
        var self = this;

		// Get information about this event
        fire.database().ref("products").child(self.props.product_id).on("value", function(data) {
            var product = data.val();
            self.setState({
				components: product.components ? Object.values(product.components) : [],
            });
		});
	}

    addComponent(event) {
        event.preventDefault();

		var self = this;

		// Create event
		var curCompenentRef = fire.database().ref("products").child(self.props.product_id).child("components").push();
		var component_id = curCompenentRef.path["pieces_"][3];
		curCompenentRef.set({
            id: component_id,
            component_type: this.state.component_type,
			name: this.state.name,
			content_type: this.state.content_type,
            file: this.state.file ? this.state.file : "",
            url: this.state.url ? this.state.url : "",
			color: generateColor(),
		})
		.then(function() {
			// Reset event component fields to be the defaults
			self.setState({
				component_type: "",
				name: "",
				content_type: "",
				file: "",
				url: "",
			});
		})
		.catch(function(error) {
			this.setState({ formError: error.code + ": " + error.message });
		});
	}

    handleFile(event) {
        event.preventDefault();
        var self = this;

        var file = event.target.files[0];
        var ref = fire.storage().ref('Component Files').child(file.name);        
        ref.put(file).then(()=>{
            ref.getDownloadURL().then((url) => {
                self.setState({ file: url });
            }).catch((err) => {
                self.setState({ formError: err.code + ": " + err.message });
            });
        }).catch((error) => {
            self.setState({ formError: error.code + ": " + error.message });
        });
	}

	render() {
        return (
			<div
				className="modal fade"
				id={"addProductComponentModal-" + this.props.id}
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
				aria-labelledby="personInfoModalTitle"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addComponentModalTitle">Add Component</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="componentType">Component Type:</label>
								<select
									name="componentType"
									className="form-control"
									value={this.state.component_type}
									onChange={(event) => this.setState({component_type: event.target.value})}
									required>
									<option>Not Specified</option>
									<option value="agenda">Agenda</option>
									<option value="budget">Budget</option>
									<option value="meetingNotes">Meeting Notes</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="componentName">Component Name:</label>
								<input
									type="text"
									name="componentName"
									className="form-control"
									value={this.state.name}
									onChange={(event) => this.setState({ name: event.target.value })}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="contentType">Content Type:</label>
								<select
									type="text"
									name="contentType"
									className="form-control"
									value={this.state.content_type}
									onChange={(event) => this.setState({ content_type: event.target.value })}
									required>
									<option>Not Specified</option>
									<option value="file">File</option>
									<option value="url">URL</option>
								</select>
							</div>
							{ (this.state.content_type === "file") ? 
								<div className="form-group">
									<label htmlFor="componentFile">File:</label>
									<input
										type="file"
										name="componentFile"
										className="form-control"
										value={this.state.file}
										onChange={this.handleFile}/>
								</div> : null }
							
							{ (this.state.content_type === "url") ? 
								<div className="form-group">
									<label htmlFor="componentUrl">URL:</label>
									<input
										type="text"
										name="componentUrl"
										className="form-control"
										value={this.state.url}
										onChange={(event) => this.setState({ url: event.target.value })} />
								</div> : null }
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-success"
								data-dismiss="modal"
								onClick={this.addComponent}>
								Add
							</button>
							<button
								type="button"
								className="btn btn-danger"
								data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddComponentModal;