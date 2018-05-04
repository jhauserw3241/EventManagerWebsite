import React, { Component } from 'react';
import ComponentTypeTable from './../ComponentTypeTable/ComponentTypeTable';
import fire from './../../fire';

class EventComponentTypeModal extends Component {
	render() {
		console.log(this.props.component_type)
        return (
            <div
                className="modal fade"
                id={"eventComponentTypeModal-" + this.props.component_type}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="eventComponentModalTitle"
                aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="eventComponentModalTitle">Pick Event Component</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
                            <ComponentTypeTable
								item="event"
								item_id={this.props.event_id}
								components={this.props.components}
								canEdit={this.props.canEdit}
								deleteItem={this.props.deleteEventComponent} />
						</div>
						<div className="modal-footer">
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

export default EventComponentTypeModal;