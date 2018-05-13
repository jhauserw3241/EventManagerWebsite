import React, { Component } from 'react';
import './../../CSS/Card.css';
import AddressInput from './../UserForm/AddressInput';
import AgenciesInput from './../UserForm/AgenciesInput';
import EmailInput from './../UserForm/EmailInput';
import FirstNameInput from './../UserForm/FirstNameInput';
import LastNameInput from './../UserForm/LastNameInput';
import PasswordInput from './../UserForm/PasswordInput';
import PhoneNumberInput from './../UserForm/PhoneNumberInput';
import PicInput from './../UserForm/PicInput';
import SharedEventsInput from './../UserForm/SharedEventsInput';

class PersonInfoModal extends Component {
	render() {
        console.log(this.props.id);
		return (
            <div className="modal fade" id={"personInfoModal-" + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="personInfoModalTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="personInfoModalTitle">Person Info</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <FirstNameInput
                                value={this.props.first_name}
                                disabled={true} />
                            <LastNameInput
                                value={this.props.last_name}
                                disabled={true} />
                            <EmailInput
                                value={this.props.email}
                                disabled={true} />
                            <PhoneNumberInput
                                value={this.props.phone_number}
                                disabled={true} />
                            <AddressInput
                                value={this.props.address}
                                disabled={true} />
                            <AgenciesInput
                                id={this.props.id}
                                onError={(error) => this.setState({ formError: error })}
                                disabled={true} />
                            <SharedEventsInput
                                id={this.props.id}
                                onError={(error) => this.setState({ formError: error })}
                                disabled={true} />
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

export default PersonInfoModal;
