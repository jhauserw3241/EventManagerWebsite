import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import FileInput from './../Common/FileInput';
import { generateColor } from './../Common/Colors';
import fire from './../../fire';
import './../../CSS/Form.css';
import './../../CSS/Settings.css';

class AestheticSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            agendaColor: "",
            budgetColor: "",
            meetingNotesColor: "",
            miscColor: "",
            defaultUserPic: "",
            defaultAgencyPic: "",
            defaultAestheticsPic: "",
            formError: "",
            disabled: true,
        }

        this.saveSettings = this.saveSettings.bind(this);
    }

    componentDidMount() {
        var self = this;

        // Get user information
        var user = fire.auth().currentUser;

        // Return if the user isn't logged in
        if(!user) {
            return;
        }

        var settingsRef = fire.database().ref("users").child(user.uid).child("settings");
        settingsRef.once("value", function(data) {
            var settings = data.val() ? data.val() : {};
            self.setState({
                agendaColor: settings.agenda_color ?
                    settings.agenda_color : generateColor(),
                budgetColor: settings.budget_color ?
                    settings.budget_color : generateColor(),
                meetingNotesColor: settings.meetingNotes_color ?
                    settings.meetingNotes_color : generateColor(),
                miscColor: settings.misc_color ?
                    settings.misc_color : generateColor(),
                partnersColor: settings.partners_color ?
                    settings.partners_color : generateColor(),
                defaultUserPic: settings.default_user_pic ?
                    settings.default_user_pic :  "",
                defaultAgencyPic: settings.default_agency_pic ?
                    settings.default_agency_pic : "",
                defaultAestheticsPic: settings.default_aesthetics_pic ?
                    settings.default_aesthetics_pic : "",
            });
		});
    }

    saveSettings() {
        // Get user information
        var user = fire.auth().currentUser;

        // Return if the user isn't logged in
        if(!user) {
            return;
        }
        
        // Update the settings
        var updates= {};
        updates['/users/' + user.uid + '/settings/agenda_color'] = this.state.agendaColor;
        updates['/users/' + user.uid + '/settings/budget_color'] = this.state.budgetColor;
        updates['/users/' + user.uid + '/settings/meetingNotes_color'] = this.state.meetingNotesColor;
        updates['/users/' + user.uid + '/settings/misc_color'] = this.state.miscColor;
        updates['/users/' + user.uid + '/settings/partners_color'] = this.state.partnersColor;
        fire.database().ref().update(updates);

        // Disable settings edits
        this.setState({ disabled: true });
    }

	render() {
        return (
            <div className="AestheticSettings">
                <div className="container">
                    <div className="content">
                        { (this.state.formError !== "") ?
                            <div className="alert alert-danger">
                                <strong>Error:</strong> {this.state.formError}
                            </div> : null }
                        <h1 className="form-header">Aesthetic Settings</h1>

                        <h3 className="form-header">Component Type Colors</h3>
                        <div className="form-group color-selector">
                            <label htmlFor="agenda">Agenda Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.agendaColor }}></div>
                                : <SketchPicker
                                color={this.state.agendaColor}
                                onChangeComplete={ (color) =>
                                    { this.setState({ agendaColor: color.hex }); } } />}
                        </div>
                        <div className="form-group color-selector">
                            <label htmlFor="budget">Budget Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.budgetColor }}></div>
                                : <SketchPicker
                                    color={this.state.budgetColor}
                                    onChangeComplete={ (color) =>
                                    { this.setState({ budgetColor: color.hex }); } } />}
                        </div>
                        <div className="form-group color-selector">
                            <label htmlFor="meetingNotes">Meeting Notes Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.meetingNotesColor }}></div>
                                : <SketchPicker
                                    color={this.state.meetingNotesColor}
                                    onChangeComplete={ (color) =>
                                        { this.setState({ meetingNotesColor: color.hex }); } } />}
                        </div>
                        <div className="form-group color-selector">
                            <label htmlFor="misc">Miscellaneous Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.miscColor }}></div>
                                : <SketchPicker
                                    color={this.state.miscColor}
                                    onChangeComplete={ (color) =>
                                        { this.setState({ miscColor: color.hex }); } } /> }
                        </div>
                        <div className="form-group color-selector">
                            <label htmlFor="misc">Partners Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.partnersColor }}></div>
                                : <SketchPicker
                                    color={this.state.partnersColor}
                                    onChangeComplete={ (color) =>
                                        { this.setState({ partnersColor: color.hex }); } } /> }
                        </div>

                        {(this.state.member === "admin") ?
                            <div>
                                <h3 className="form-header">Default Images</h3>
                                <div className="form-group">
                                    <label htmlFor="defaultUserPic">Default User Picture:</label>
                                    <FileInput
                                        handleSuccess={(url) => {}}
                                        handleError={(error) => this.setState({ formError: error })}
                                        folderName="Defaults"
                                        fieldName="defaultUserPic" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="defaultAgencyPic">Default Agency Picture:</label>
                                    <FileInput
                                        handleSuccess={(url) => {}}
                                        handleError={(error) => this.setState({ formError: error })}
                                        folderName="Defaults"
                                        fieldName="defaultAgencyPic" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="defaultAestheticsPic">Default Aesthetics Picture:</label>
                                    <FileInput
                                        handleSuccess={(url) => {}}
                                        handleError={(error) => this.setState({ formError: error })}
                                        folderName="Defaults"
                                        fieldName="defaultAestheticsPic" />
                                </div>
                            </div> : null }
                        <div>
                            {(this.state.disabled) ? 
                                <input
                                    type="button"
                                    className="btn btn-warning"
                                    value="Edit"
                                    onClick={(event) => this.setState({ disabled: false })} />
                                : <input
                                    type="button"
                                    className="btn btn-success"
                                    value="Save"
                                    onClick={this.saveSettings} /> }
                        </div>
                    </div>
                </div>
            </div>);
	}
}

export default AestheticSettings;
