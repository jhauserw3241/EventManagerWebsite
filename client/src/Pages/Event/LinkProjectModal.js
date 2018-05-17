import React, { Component } from 'react';
import Overlay from './../Common/Overlay';
import ProjectType from './../LinkProjectForm/ProjectType';
import ProjectSelectInput from './../LinkProjectForm/ProjectSelectInput';
import {
    isEmptyString,
    invalidFieldStyle,
    invalidTipStyle,
    validTipStyle,
} from './../Common/FormValidation';
import fire from './../../fire';

class LinkProjectModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
			project_type: "",
			all_events: {},
			linked_events: [],
			all_products: {},
			linked_products: [],
			showErrors: false,
        };

		this.combineJSONObjects = this.combineJSONObjects.bind(this);
		this.isFormValid = this.isFormValid.bind(this);
		this.linkProject = this.linkProject.bind(this);
    }

    componentDidMount() {
		var self = this;
		
		var user = fire.auth().currentUser;
		if(!user) {
			return;
		}

		// Get information about this event
        fire.database().ref("events").on("value", function(data) {
			var events = data.val() ? data.val() : {};
			var cur_event_linked_events = [];
			var cur_event_linked_products = [];

			for(var event_id in events) {
				var event = events[event_id];

				// Check if the event is the current event
				if(event_id === self.props.event_id) {
					var projects = event.linked_projects;

					// Get all the linked projects associated with the current event
					for(var project_id in projects) {
						var project_type = projects[project_id];

						// Sort out linked projects by type
						if(project_type === "event") {
							cur_event_linked_events.push(project_id);
						} else if(project_type === "product") {
							cur_event_linked_products.push(project_id);
						}
					}
				}
			}

			self.setState({
				all_events: events,
				linked_events: cur_event_linked_events,
				linked_products: cur_event_linked_products,
			})
		});

		// Get information about the products
		fire.database().ref("products").on("value", (data) =>
			this.setState({ all_products: data.val() ? data.val() : {} }));
	}

	combineJSONObjects(objA, objB) {
		for(var item_id in objB) {
			objA[item_id] = objB[item_id];
		}

		return objA;
	}

	isFormValid() {
		if(isEmptyString(this.state.project_type)) {
			return false;
		}

		return true;
	}

	linkProject() {
		// Check if the form is valid
		if(!this.isFormValid()) {
			this.setState({ showErrors: true });
			return;
		}

		var projects = this.combineJSONObjects(this.state.linked_events, this.state.linked_products);
		var updates = {};
		for(var project_id in projects) {
			var project_type = projects[project_id];
			updates['/events/' + this.props.event_id + "/linked_projects/" + project_id] = project_type;
		}
		fire.database().ref().update(updates);

		// Close the modal
		this.props.updateModalVisibility(false);
	}

	render() {
        return (
			<Overlay
				id={"linkProjectModal-" + this.props.id}
				title="Link Project"
				visible={this.props.visible}
				updateModalVisibility={this.props.updateModalVisibility}>
				<div className="modal-body">
					<ProjectType
						value={this.state.project_type}
						showErrors={this.state.showErrors}
						onChange={(value) => this.setState({ project_type: value })} />
					{ (this.state.project_type === "event") ?
						<ProjectSelectInput
							available_list={this.state.all_events}
							selected_list={this.state.linked_events}
							project_type="event"
							updateSelectedOptions={(list) => this.setState({ linked_events: list })} />
						: null }
					
					{ (this.state.project_type === "product") ? 
						<ProjectSelectInput
							available_list={this.state.all_products}
							selected_list={this.state.linked_products}
							project_type="product"
							updateSelectedOptions={(list) => this.setState({ linked_products: list })} />
						: null }
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-success"
						onClick={() => this.linkProject()}>
						Add
					</button>
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => this.props.updateModalVisibility(false)}>
						Close
					</button>
				</div>
			</Overlay>
		);
	}
}

export default LinkProjectModal;