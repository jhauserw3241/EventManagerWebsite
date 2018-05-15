import React, { Component } from 'react';
import fire from './../../fire';
import { formatTagsForDatabase } from '../Common/TagHelper';
import Overlay from './../Common/Overlay';
import NameInput from './../AgencyForm/NameInput';
import AliasInput from './../AgencyForm/AliasInput';
import PicInput from './../AgencyForm/PicInput';
import {
    isEmptyString,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';

class AddAgencyModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
			name: "",
			aliases: [],
			pic: "",
			showErrors: false,
        };

		this.isFormValid = this.isFormValid.bind(this);
		this.addAgency = this.addAgency.bind(this);
		this.handleAliasAddition = this.handleAliasAddition.bind(this);
		this.handleAliasDelete = this.handleAliasDelete.bind(this);
		this.handleAliasDrag = this.handleAliasDrag.bind(this);
	}
	
	isFormValid() {
		// Check if the agency name is valid
		if(isEmptyString(this.state.name)) {
			return false;
		}

		return true;
	}

    addAgency(event) {
        event.preventDefault();

		var self = this;

		if(!this.isFormValid()) {
			this.setState({ showErrors: true });
			return;
		}

		// Create event
		var curAgencyRef = fire.database().ref("agencies").push();
		var agency_id = curAgencyRef.key;
		curAgencyRef.set({
            id: agency_id,
			name: self.state.name,
			aliases: formatTagsForDatabase(self.state.aliases),
			pic: self.state.pic ?
				self.state.pic :
				"https://firebasestorage.googleapis.com/v0/b/event-planner-website.appspot.com/o/Defaults%2Fagency.png?alt=media&token=887cb22b-c34d-4c6d-907c-a3a8b2cd3797",
		})
		.then(function() {
			// Reset event component fields to be the defaults
			self.setState({
				name: "",
				aliases: [],
				pic: "",
			});
		})
		.catch(function(error) {
			this.props.onError(error.code + ": " + error.message);
		});

		// Close the modal
		this.props.updateModalVisibility(false);
	}

    handleAliasDelete(i) {
      var tags = this.state.aliases.filter((tag, index) => index !== i);
      this.setState({ aliases: tags });
    }
  
    handleAliasAddition(tag) {
		var tags = [...this.state.aliases, ...[tag]];
		this.setState({ aliases: tags });
    }
  
    handleAliasDrag(tag, currPos, newPos) {
      const tags = [...this.state.aliases];
      const newTags = tags.slice();
  
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      this.setState({ aliases: newTags });
	}

	render() {
        return (
			<Overlay
				id="addAgencyModal"
				title="Add Agency"
				visible={this.props.visible}
				updateModalVisibility={this.props.updateModalVisibility}>
				<div className="modal-body">
					<NameInput
						value={this.state.name}
						showErrors={this.props.showErrors}
						onChange={(text) => this.setState({ name: text })}
						onError={(error) => this.setState({ formError: error })} />
					<AliasInput
						tags={this.state.aliases}
						handleDelete={this.handleAliasDelete}
						handleAddition={this.handleAliasAddition}
						handleDrag={this.handleAliasDrag}
						onChange={(tags) => this.setState({ aliases: tags })} />
					<PicInput
						onChange={(url) => this.setState({ pic: url })}
						onError={(error) => this.setState({ formError: error })} />
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-success"
						data-dismiss="modal"
						onClick={this.addAgency}>
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

export default AddAgencyModal;