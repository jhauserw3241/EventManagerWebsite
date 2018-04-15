import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

class EventComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_id: this.props.match.params.event_id,
            component_id: this.props.match.params.component_id,
            component_type: "",
            name: "",
            content_type: "",
            file: "",
            url: "",
            color: "",
        };

        this.editComponent = this.editComponent.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount() {
        var self = this;

        var curEventRef = fire.database().ref("events").child(this.state.event_id);
        var curComponentRef = curEventRef.child("components").child(this.state.component_id);
		curComponentRef.on("value", function(data) {
            var component = data.val();
            console.log(component);
            self.setState({
                component_type: component.component_type,
                name: component.name ? component.name : "Component",
                content_type: component.content_type,
                file: component.file,
                url: component.url,
                color: component.color,
            });
        });
    }

    editComponent(event) {
        event.preventDefault();

		var self = this;

		// Edit event
        var updates = {};
        updates['/events/' + this.state.event_id + '/components/' + this.state.component_id] = {
            id: this.state.component_id,
            component_type: this.state.component_type,
            name: this.state.name,
            content_type: this.state.content_type,
            file: this.state.file,
            url: this.state.url,
			color: this.state.color
		};
        fire.database().ref().update(updates);
	}

    handleFile(event) {
        event.preventDefault();
        var self = this;

        var file = event.target.files[0];
        var ref = fire.storage().ref('Component Files').child(file.name);        
        ref.put(file).then(()=>{
            ref.getDownloadURL().then((url) => {
                self.setState({file: url});
            }).catch((err) => {
                self.setState({ formError: err.code + ": " + err.message });
            });
        }).catch((error) => {
            self.setState({ formError: error.code + ": " + error.message });
        });
    }

	render() {
        console.log(this.state.content_type);
        return (
            <div className="EventComponent">
                <div
                    className="modal fade"
                    id="editEventComponentModal"
                    tabIndex="-1"
                    role="dialog"
                    data-backdrop="static"
                    data-keyboard={false}
                    aria-labelledby="editEventComponentModalTitle"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editEventComponentTitle">Edit Event Component</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="componentType">Component Type:</label>
                                    <select
                                        name="componentType"
                                        className="form-control"
                                        value={this.state.component_type}
                                        onChange={(event) => this.setState({component_type: event.target.value})}
                                        required>
                                        <option>Not Specified</option>
                                        <option value="agenda">Agenda</option>
                                        <option value="budget">Budget</option>
                                        <option value="meetingNotes">Meeting Notes</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={(event) => this.setState({name: event.target.value})}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contentType">Content Type:</label>
                                    <select
                                        name="contentType"
                                        className="form-control"
                                        value={this.state.content_type}
                                        onChange={(event) => this.setState({content_type: event.target.value})}
                                        required>
                                        <option>Not Specified</option>
                                        <option value="file">File</option>
                                        <option value="url">URL</option>
                                    </select>
                                </div>
                                { (this.state.content_type === "file") ? 
                                    <div className="form-group">
                                        <label htmlFor="componentFile">File:</label>
                                        <input
                                            type="file"
                                            name="componentFile"
                                            className="form-control"
                                            value={this.state.file}
                                            onChange={this.handlePic}/>
                                    </div> : null }
                                { (this.state.content_type === "url") ? 
                                    <div className="form-group">
                                        <label htmlFor="componentUrl">URL:</label>
                                        <input
                                            type="text"
                                            name="componentUrl"
                                            className="form-control"
                                            value={this.state.url}
                                            onChange={(event) => this.setState({ url: event.target.value })} />
                                    </div> : null }
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    onClick={this.editComponent}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="content">
                        <h1>{this.state.name}</h1>
                        <button
                            className="btn btn-warning"
                            data-toggle="modal"
                            data-target="#editEventComponentModal">Edit</button>
                        {(this.state.content_type === "file") ? 
                            <iframe className="agenda-iframe" src={this.state.file} allowFullScreen></iframe>
                            : <iframe className="agenda-iframe" src={this.state.url} allowFullScreen></iframe> }
                    </div>
                </div>
            </div>
        );
	}
}

export default EventComponent;