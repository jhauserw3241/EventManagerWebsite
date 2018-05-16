import React, { Component } from 'react';
import FileInput from './../Common/FileInput';
import fire from './../../fire';
import { isEmptyString } from './../Common/FormValidation';
import ComponentTypeInput from './../ComponentForm/ComponentTypeInput';
import NameInput from './../ComponentForm/NameInput';
import ContentTypeInput from './../ComponentForm/ContentTypeInput';
import ComponentFileInput from './../ComponentForm/ComponentFileInput';
import UrlInput from './../ComponentForm/UrlInput';
import Overlay from './../Common/Overlay';

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
			showErrors: false,
        };

		this.isFormValid = this.isFormValid.bind(this);
		this.addComponent = this.addComponent.bind(this);
    }

    componentDidMount() {
        var self = this;

		// Get information about this event
        fire.database().ref("events").child(self.props.event_id).on("value", function(data) {
            var event = data.val();
            self.setState({
				components: event.components ? Object.values(event.components) : [],
            });
		});
	}

	isFormValid() {
		// Check if the component type is valid
		if(isEmptyString(this.state.component_type)) {
			return false;
		}
		
		// Check if the component name is valid
		if(isEmptyString(this.state.name)) {
			return false;
		}
		
		// Check if the content type is valid
		if(isEmptyString(this.state.content_type)) {
			return false;
		}
		
		if(this.state.content_type === "file") {
			// Check if the file is valid
			if(isEmptyString(this.state.file)) {
				return false;
			}
		} else if(this.state.content_type === "url") {
			// Check if the URL is valid
			if(isEmptyString(this.state.url)) {
				return false;
			}
		}

		return true;
	}

    addComponent(event) {
        event.preventDefault();

		var self = this;

		// Check if the form is valid
		if(!this.isFormValid()) {
			this.setState({ showErrors: true });
			return;
		}

		// Create event
		var curCompenentRef = fire.database().ref("events").child(self.props.event_id).child("components").push();
		var component_id = curCompenentRef.path["pieces_"][3];
		curCompenentRef.set({
            id: component_id,
            component_type: this.state.component_type,
			name: this.state.name,
			content_type: this.state.content_type,
            file: this.state.file ? this.state.file : "",
            url: this.state.url ? this.state.url : "",
			color: "#"+((1<<24)*Math.random()|0).toString(16), // Generate random color
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

		// Close the modal
		this.props.updateModalVisibility(false);
	}

	render() {
        return (
			<Overlay
				id={"addComponentModal-" + this.props.id}
				title="Add Component"
				visible={this.props.visible}
				updateModalVisibility={this.props.updateModalVisibility}>
				<div className="modal-body">
					<ComponentTypeInput
						value={this.state.component_type}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({component_type: value})} />
					<NameInput 
						value={this.state.name}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ name: value })} />
					<ContentTypeInput
						value={this.state.content_type}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ content_type: value })} />
					{ (this.state.content_type === "file") ?
						<ComponentFileInput
							onChange={(url) => this.setState({ file: url })}
							onError={(error) => this.setState({ formError: error })} />
						: null }
					{ (this.state.content_type === "url") ?
						<UrlInput
							value={this.state.url}
							showErrors={this.state.showErrors}
							onChange={(value) => this.setState({ url: value })} />
						: null }
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-success"
						onClick={this.addComponent}>
						Add
					</button>
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => this.props.updateModalVisibility(false)}>
						Close
					</button>
				</div>
			</Overlay>
		);
	}
}

export default AddComponentModal;