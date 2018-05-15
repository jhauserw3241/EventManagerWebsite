import React, { Component } from 'react';
import AgencyPeopleTags from './../Common/AgencyPeopleTags';
import LoginRequired from '../Login/LoginRequired';
import Overlay from './../Common/Overlay';
import NameInput from './../AgencyForm/NameInput';
import AliasInput from './../AgencyForm/AliasInput';
import PeopleInput from './../AgencyForm/PeopleInput';
import fire from './../../fire';

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
        this.props.updateModalVisibility(false);
    }

    getFieldValue(fieldName) {
        return ((   (this.state[fieldName] === undefined) || // Check if field value isn't set
                    (this.state[fieldName] === "")) &&
                (this.state[fieldName + "_updated"] === false)) ? // Check if field value hasn't been updated 
                this.props[fieldName] : this.state[fieldName];
    }

	render() {
		return (
            <Overlay
                id={"agencyInfoModal-" + this.props.id}
                title="Agency Info"
                visible={this.props.visible}
                updateModalVisibility={this.props.updateModalVisibility}>
                <div className="modal-body">
                    <NameInput
                        value={this.getFieldValue("name")}
                        onChange={(event) => this.setState({ name: event.target.value })}
                        disabled={!this.state.allowEdits} />
                    <AliasInput
                        id={this.props.id}
                        readOnly={!this.state.allowEdits} />
                    <PeopleInput
                        id={this.props.id} />
                </div>
                <div className="modal-footer">
                    <LoginRequired requiredRole="admin">
                        {(this.state.allowEdits) ?
                            <button
                                className="btn btn-success"
                                onClick={this.saveAgency}>
                                Save
                            </button>
                            :<button
                                className="btn btn-warning"
                                onClick={(event) =>
                                    this.setState({ allowEdits: true })}>
                                Edit
                            </button>
                        }
                    </LoginRequired>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            this.props.updateModalVisibility(false)}>
                        Close
                    </button>
                </div>
            </Overlay>
		);
	}
}

export default AgencyInfoModal;
