import React, { Component } from 'react';
import AliasTags from './../Common/AliasTags';
import AgencyPeopleTags from './../Common/AgencyPeopleTags';
import LoginRequired from '../Login/LoginRequired';
import fire from './../../fire';
import './../../CSS/Card.css';

class AgencyInfoModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allowEdits: false,
            name: this.props.name,
            name_updated: false,
        };

        this.saveAgency = this.saveAgency.bind(this);
        this.getFieldValue = this.getFieldValue.bind(this);
    }

    saveAgency() {
        var updates = {};
        updates["/agencies/" + this.props.id + "/name"] = this.getFieldValue("name");
        fire.database().ref().update(updates);

        this.setState({ allowEdits: false });
    }

    getFieldValue(fieldName) {
        return ((   (this.state[fieldName] === undefined) || // Check if field value isn't set
                    (this.state[fieldName] === "")) &&
                (this.state[fieldName + "_updated"] === false)) ? // Check if field value hasn't been updated 
                this.props[fieldName] : this.state[fieldName];
    }

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
                                    value={this.getFieldValue("name")}
                                    onChange={(event) => this.setState({ name: event.target.value })}
                                    disabled={!this.state.allowEdits}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="aliases">Aliases:</label>
                                <AliasTags
                                    id={this.props.id}
                                    readOnly={!this.state.allowEdits} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="people">Associated People:</label>
                                <AgencyPeopleTags
                                    id={this.props.id}
                                    readOnly={true} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <LoginRequired requiredRole="admin">
                                {(this.state.allowEdits) ?
                                    <button
                                        className="btn btn-success"
                                        onClick={this.saveAgency}
                                        data-toggle="modal"
                                        data-target={"#agencyInfoModal-" + this.props.id}>
                                        Save
                                    </button>
                                    :<button
                                        className="btn btn-warning"
                                        onClick={(event) => this.setState({ allowEdits: true })}>
                                        Edit
                                    </button>
                                }
                            </LoginRequired>
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
