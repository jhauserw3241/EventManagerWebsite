import React, { Component } from 'react';
import FileInput from './../Common/FileInput';
import AliasTags from './../Common/AliasTags';
import fire from './../../fire';
import { formatTagsForDatabase } from '../Common/TagHelper';

class AddAgencyModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
			name: "",
			aliases: [],
			pic: "",
        };

		this.addAgency = this.addAgency.bind(this);
		this.handleAliasAddition = this.handleAliasAddition.bind(this);
		this.handleAliasDelete = this.handleAliasDelete.bind(this);
		this.handleAliasDrag = this.handleAliasDrag.bind(this);
    }

    addAgency(event) {
        event.preventDefault();

		var self = this;

		console.log(self.state.pic);

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
			this.setState({ formError: error.code + ": " + error.message });
		});
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
			<div
				className="modal fade"
				id="addAgencyModal"
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
				aria-labelledby="addAgencyModalTitle"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addAgencyModalTitle">Add Agency</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="name">Name:</label>
								<input
									type="text"
									name="name"
									className="form-control"
									value={this.state.name}
									placeholder="Name"
									onChange={(event) => this.setState({ name: event.target.value })}
									required />
							</div>
							<div className="form-group">
								<label htmlFor="aliases">Aliases:</label>
								<AliasTags
									tags={this.state.aliases}
									shouldStore={false}
									handleDelete={this.handleAliasDelete}
									handleAddition={this.handleAliasAddition}
									handleDrag={this.handleAliasDrag} />
							</div>
                            <div className="form-group">
                                <label htmlFor="pic">Picture:</label>
								<FileInput
									handleSuccess={(url) => this.setState({ pic: url })}
									handleError={(error) => this.setState({ formError: error })}
									folderName="Agencies"
									fieldName="pic" />
                            </div>
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

export default AddAgencyModal;