import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { handlePictureSelected } from './../Common/PictureHelper';
import { generateColor } from './../Common/Colors';
import fire from './../../fire';
import './../../CSS/Form.css';
import './../../CSS/Settings.css';

class AestheticSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventAgendaColor: "",
            eventBudgetColor: "",
            eventMeetingNotesColor: "",
            eventMiscColor: "",
            productPublicationColor: "",
            productVideoColor: "",
            productWebinarColor: "",
            productMiscColor: "",
            defaultUserPic: "",
            defaultAgencyPic: "",
            formError: "",
            disabled: true,
        }

        this.changeDefaultAgencyPic = this.changeDefaultAgencyPic.bind(this);
        this.changeDefaultUserPic = this.changeDefaultUserPic.bind(this);
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
                eventAgendaColor: settings.event_agenda_color ?
                    settings.event_agenda_color : generateColor(),
                eventBudgetColor: settings.event_budget_color ?
                    settings.event_budget_color : generateColor(),
                eventMeetingNotesColor: settings.event_meeting_notes_color ?
                    settings.event_meeting_notes_color : generateColor(),
                eventMiscColor: settings.event_misc_color ?
                    settings.event_misc_color : generateColor(),
                productPublicationColor: settings.product_publication_color ?
                    settings.product_publication_color : generateColor(),
                productVideoColor: settings.product_video_color ?
                    settings.product_video_color : generateColor(),
                productWebinarColor: settings.product_webinar_color ?
                    settings.product_webinar_color : generateColor(),
                productMiscColor: settings.product_misc_color ?
                    settings.product_misc_color : generateColor(),
                defaultUserPic: settings.default_user_pic ?
                    settings.default_user_pic :  "",
                defaultAgencyPic: settings.default_agency_pic ?
                    settings.default_agency_pic : "",
            });
		});
    }

    changeDefaultUserPic(event) {
        handlePictureSelected(
            event,
            (error) => this.setState({ formError: error }),
            "Defaults",
            "profile.png",
        );
    }

    changeDefaultAgencyPic(event) {
        handlePictureSelected(
            event,
            (error) => this.setState({ formError: error }),
            "Defaults",
            "agency.png",
        );
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
        updates['/users/' + user.uid + '/settings/event_agenda_color'] = this.state.eventAgendaColor;
        updates['/users/' + user.uid + '/settings/event_budget_color'] = this.state.eventBudgetColor;
        updates['/users/' + user.uid + '/settings/event_meeting_notes_color'] = this.state.eventMeetingNotesColor;
        updates['/users/' + user.uid + '/settings/event_misc_color'] = this.state.eventMiscColor;
        updates['/users/' + user.uid + '/settings/product_publication_color'] = this.state.productPublicationColor;
        updates['/users/' + user.uid + '/settings/product_video_color'] = this.state.productVideoColor;
        updates['/users/' + user.uid + '/settings/product_webinar_color'] = this.state.productWebinarColor;
        updates['/users/' + user.uid + '/settings/product_misc_color'] = this.state.productMiscColor;
        updates['/users/' + user.uid + '/settings/default_user_pic'] = this.state.defaultUserPic;
        updates['/users/' + user.uid + '/settings/default_agency_pic'] = this.state.defaultAgencyPic;
        fire.database().ref().update(updates);

        // Disable settings edits
        this.setState({ disabled: true });
    }

	render() {
        console.log(this.state.disabled);
        console.log(this.state.eventAgendaColor);

        return (
            <div className="AestheticSettings">
                <div className="container">
                    <div className="content">
                        { (this.state.formError !== "") ?
                            <div className="alert alert-danger">
                                <strong>Error:</strong> {this.state.formError}
                            </div> : null }
                        <h1 className="form-header">Aesthetic Settings</h1>

                        <h3 className="form-header">Event Colors</h3>
                        <div className="form-group color-selector">
                            <label htmlFor="eventAgenda">Event Agenda Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.eventAgendaColor }}></div>
                                : <SketchPicker
                                color={this.state.eventAgendaColor}
                                onChangeComplete={ (color) =>
                                    { this.setState({ eventAgendaColor: color.hex }); } } />}
                        </div>
                        <div className="form-group color-selector">
                            <label htmlFor="eventBudget">Event Budget Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.eventBudgetColor }}></div>
                                : <SketchPicker
                                    color={this.state.eventBudgetColor}
                                    onChangeComplete={ (color) =>
                                    { this.setState({ eventBudgetColor: color.hex }); } } />}
                        </div>
                        <div className="form-group color-selector">
                            <label htmlFor="eventMeetingNotes">Event Meeting Notes Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.eventMeetingNotesColor }}></div>
                                : <SketchPicker
                                    color={this.state.eventMeetingNotesColor}
                                    onChangeComplete={ (color) =>
                                        { this.setState({ eventMeetingNotesColor: color.hex }); } } />}
                        </div>
                        <div className="form-group color-selector">
                            <label htmlFor="eventMisc">Event Miscellaneous Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.eventMiscColor }}></div>
                                : <SketchPicker
                                    color={this.state.eventMiscColor}
                                    onChangeComplete={ (color) =>
                                        { this.setState({ eventMiscColor: color.hex }); } } /> }
                        </div>

                        <h3 className="form-header">Product Colors</h3>
                        <div className="form-group color-selector">
                            <label htmlFor="productPublication">Product Publication Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.productPublicationColor }}></div>
                                : <SketchPicker
                                    color={this.state.productPublicationColor}
                                    onChangeComplete={ (color) =>
                                        { this.setState({ productPublicationColor: color.hex }); } } />}
                        </div>
                        <div className="form-group color-selector">
                            <label htmlFor="productVideo">Product Video Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.productVideoColor }}></div>
                                : <SketchPicker
                                    color={this.state.productVideoColor}
                                    onChangeComplete={ (color) =>
                                        { this.setState({ productVideoColor: color.hex }); } } />}
                        </div>
                        <div className="form-group color-selector">
                            <label htmlFor="productWebinar">Product Webinar Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.productWebinarColor }}></div>
                                : <SketchPicker
                                    color={this.state.productWebinarColor}
                                    onChangeComplete={ (color) =>
                                        { this.setState({ productWebinarColor: color.hex }); } } />}
                        </div>
                        <div className="form-group color-selector">
                            <label htmlFor="productMisc">Product Miscellaneous Color:</label>
                            {(this.state.disabled) ? 
                                <div className="color-display"
                                    style={{ backgroundColor: this.state.productMiscColor }}></div>
                                : <SketchPicker
                                    color={this.state.productMiscColor}
                                    onChangeComplete={ (color) =>
                                        { this.setState({ productMiscColor: color.hex }); } } />}
                        </div>

                        <h3 className="form-header">Default Images</h3>
                        <div className="form-group">
                            <label htmlFor="defaultUserPic">Default User Picture:</label>
                            <input
                                type="file"
                                name="defaultUserPic"
                                className="form-control"
                                accept="image/*"
                                onChange={this.changeDefaultUserPic}
                                disabled={this.state.disabled}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="defaultAgencyPic">Default Agency Picture:</label>
                            <input
                                type="file"
                                name="defaultAgencyPic"
                                className="form-control"
                                accept="image/*"
                                onChange={this.changeDefaultAgencyPic}
                                disabled={this.state.disabled}
                                />
                        </div>
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
            </div>);
	}
}

export default AestheticSettings;
