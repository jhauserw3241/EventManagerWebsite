import React, { Component } from 'react';
import './../../CSS/Card.css';
import Overlay from './../Common/Overlay';
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
		return (
            <Overlay
                id={"personInfoModal-" + this.props.id}
                title="Person Info"
                visible={this.props.visible}
                updateModalVisibility={this.props.updateVisibility}>
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
                        onClick={() => this.props.updateVisibility(false)}>
                        Close
                    </button>
                </div>
            </Overlay>
		);
	}
}

export default PersonInfoModal;
