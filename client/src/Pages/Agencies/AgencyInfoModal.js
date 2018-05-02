import React, { Component } from 'react';
import AliasTags from './../Common/AliasTags';
import AgencyPeopleTags from './../Common/AgencyPeopleTags';
import fire from './../../fire';
import './../../CSS/Card.css';

class AgencyInfoModal extends Component {
	render() {
		return (
            <div
                className="modal fade"
                id={"agencyInfoModal-" + this.props.id}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="agencyInfoModalTitle"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="agencyInfoModalTitle">Agency Info</h5>
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
                                    value={this.props.name}
                                    disabled={true}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="aliases">Aliases:</label>
                                <AliasTags
                                    id={this.props.id}
                                    readOnly={true} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="people">Associated People:</label>
                                <AgencyPeopleTags
                                    id={this.props.id}
                                    readOnly={true} />
                            </div>
                        </div>
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

export default AgencyInfoModal;
