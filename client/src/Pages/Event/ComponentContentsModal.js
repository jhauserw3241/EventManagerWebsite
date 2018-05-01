import React, { Component } from 'react';
import ComponentTypeTable from './../ComponentTypeTable/ComponentTypeTable';
import fire from './../../fire';
import DateTime from "./../../../node_modules/react-datetime/DateTime.js";

class ComponentContentsModal extends Component {
	render() {
        return (
			<div
				className="modal fade"
				id="componentContentsModal"
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
				aria-labelledby="componentContentsModalTitle"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="componentContentsModalTitle">Add Event</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<ComponentTypeTable
							owner_id={this.props.owner_id}
							components={this.props.components} />
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
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

export default ComponentContentsModal;