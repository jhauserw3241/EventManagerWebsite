import React, { Component } from 'react';
import { handlePictureSelected } from './../Common/PictureHelper';
import fire from './../../fire';
import './../../CSS/Card.css';

class EditProductComponentModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product_id: this.props.product_id,
            component_id: this.props.component_id,
            component_type: this.props.component_type,
            component_type_updated: false,
            name: this.props.name,
            name_updated: false,
            content_type: this.props.content_type,
            content_type_updated: false,
            file: this.props.file,
            file_updated: false,
            url: this.props.url,
            url_updated: false,
            color: this.props.color,
            color_updated: false,
        };

        this.editComponent = this.editComponent.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.getFieldValue = this.getFieldValue.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState( {
            product_id: this.props.product_id,
            component_id: this.props.component_id,
            component_type: this.props.component_type,
            component_type_updated: false,
            name: this.props.name,
            name_updated: false,
            content_type: this.props.content_type,
            content_type_updated: false,
            file: this.props.file,
            file_updated: false,
            url: this.props.url,
            url_updated: false,
            color: this.props.color,
            color_updated: false,
        })
    }

    editComponent(event) {
        event.preventDefault();

		// Edit event component
        var updates = {};
        updates['/products/' + this.props.product_id + '/components/' + this.props.component_id + '/id'] = this.getFieldValue("component_id");
        updates['/products/' + this.props.product_id + '/components/' + this.props.component_id + '/component_type'] = this.getFieldValue("component_type");
        updates['/products/' + this.props.product_id + '/components/' + this.props.component_id + '/name'] = this.getFieldValue("name");
        updates['/products/' + this.props.product_id + '/components/' + this.props.component_id + '/content_type'] = this.getFieldValue("content_type");
        updates['/products/' + this.props.product_id + '/components/' + this.props.component_id + '/file'] = this.getFieldValue("file");
        updates['/products/' + this.props.product_id + '/components/' + this.props.component_id + '/url'] = this.getFieldValue("url");
        updates['/products/' + this.props.product_id + '/components/' + this.props.component_id + '/color'] = this.getFieldValue("color");
        fire.database().ref().update(updates);
	}

    handleFile(event) {
        event.preventDefault();

        handlePictureSelected(
            event,
            (url) => this.setState({
                file: url,
                file_updated: true
            }),
            (error) => this.setState({ formError: error }),
            'Component Files'
        );
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
                            <h5 className="modal-title" id="editEventComponentTitle">Edit Product Component</h5>
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
                                    value={this.getFieldValue("component_type")}
                                    onChange={(event) => this.setState({
                                        component_type: event.target.value,
                                        component_type_updated: true
                                    })}
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
                                    value={this.getFieldValue("name")}
                                    onChange={(event) => this.setState({
                                        name: event.target.value,
                                        name_updated: true,
                                    })}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contentType">Content Type:</label>
                                <select
                                    name="contentType"
                                    className="form-control"
                                    value={this.getFieldValue("content_type")}
                                    onChange={(event) => this.setState({
                                        content_type: event.target.value,
                                        content_type_updated: true,
                                    })}
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
                                        value={this.getFieldValue("file")}
                                        onChange={this.handleFile}/>
                                </div> : null }
                            { (this.state.content_type === "url") ? 
                                <div className="form-group">
                                    <label htmlFor="componentUrl">URL:</label>
                                    <input
                                        type="text"
                                        name="componentUrl"
                                        className="form-control"
                                        value={this.getFieldValue("url")}
                                        onChange={(event) => this.setState({
                                            url: event.target.value,
                                            url_updated: true,
                                        })} />
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
        );
	}
}

export default EditProductComponentModal;