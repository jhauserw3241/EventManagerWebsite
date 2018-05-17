import React, { Component } from 'react';
import Overlay from './../Common/Overlay';
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
        };

		this.createEventSelectItems = this.createEventSelectItems.bind(this);
		this.onEventDropdownSelected = this.onEventDropdownSelected.bind(this);
		this.createProductSelectItems = this.createProductSelectItems.bind(this);
		this.onProductDropdownSelected = this.onProductDropdownSelected.bind(this);
		this.combineJSONObjects = this.combineJSONObjects.bind(this);
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
	
	createEventSelectItems() {
		var items = [];
		var options_count = 0;

		// Add not specified option
		items.push(
			<option
				key={options_count}
				value=""
				// Check if the product is already linked
				disabled={false}>
				Not Specified
			</option>);

		options_count += 1;

		// Add options for all events
		for (var event_id in this.state.all_events) {
			var event = this.state.all_events[event_id];
			items.push(
				<option
					key={options_count}
					value={event_id}
					// Check if the event is already linked
					disabled={
						(event_id === this.props.event_id) ||
						(Object.keys(this.state.linked_events).indexOf(event_id) > -1)
					}>
					{event.name}
				</option>);

			options_count += 1;
		}
		return items;
	}  
   
	onEventDropdownSelected(event) {
		console.log("test")
		var event_id = event.target.value;

		console.log(this.state.linked_events);
		// Check if event is already linked
		if(Object.keys(this.state.linked_events).indexOf(event_id) <= -1) {
			// Get event information
			var event = this.state.all_events[event_id];

			// Add event to list of linked evnets
			var temp = this.state.linked_events;
			console.log(temp);
			temp[event_id] = "event";
			console.log(temp);
			this.setState({ linked_events: temp });
		}
	}

	createProductSelectItems() {
		var items = [];
		var options_count = 0;

		// Add not specified option
		items.push(
			<option
				key={options_count}
				value=""
				// Check if the product is already linked
				disabled={false}>
				Not Specified
			</option>);

		options_count += 1;

		// Add options for all products
		for (var product_id in this.state.all_products) {
			var product = this.state.all_products[product_id];
			items.push(
				<option
					key={options_count}
					value={product_id}
					// Check if the product is already linked
					disabled={
						(Object.keys(this.state.linked_products).indexOf(product_id) > -1)
					}>
					{product.name}
				</option>);

			options_count += 1;
		}
		return items;
	}  
   
	onProductDropdownSelected(event) {
		var product_id = event.target.value;

		console.log(this.state.linked_products);
		// Check if product is already linked
		if(Object.keys(this.state.linked_products).indexOf(product_id) <= -1) {
			// Get product information
			var product = this.state.all_products[product_id];

			// Add product to list of linked products
			var temp = this.state.linked_products;
			console.log(temp);
			temp[product_id] = "product";
			console.log(temp);
			this.setState({ linked_products: temp });
		}
	}

	combineJSONObjects(objA, objB) {
		for(var item_id in objB) {
			objA[item_id] = objB[item_id];
		}

		return objA;
	}

	linkProject() {
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
					<div className="form-group">
						<label htmlFor="projectType">Project Type:</label>
						<select
							type="text"
							name="projectType"
							className="form-control"
							value={this.state.project_type}
							placeholder="Project Type"
							onChange={(event) => this.setState({ project_type: event.target.value })}
							required>
							<option value="">Not Specified</option>
							<option value="event">Event</option>
							<option value="product">Product</option>
						</select>
					</div>
					{ (this.state.project_type === "event") ? 
						<div className="form-group">
							<label htmlFor="eventName">Event Name:</label>
							<select
								label="eventName"
								className="form-control"
								onChange={this.onEventDropdownSelected}
								multiple>
								{this.createEventSelectItems()}
							</select>
						</div> : null }
					
					{ (this.state.project_type === "product") ? 
						<div className="form-group">
							<label htmlFor="productName">Product Names:</label>
							<select
								label="productName"
								className="form-control"
								onChange={this.onProductDropdownSelected}
								multiple>
								{this.createProductSelectItems()}
							</select>
						</div> : null }
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