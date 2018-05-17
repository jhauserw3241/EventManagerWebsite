import React, { Component } from 'react';
import Overlay from './../Common/Overlay';
import fire from './../../fire';

class ProjectSelectInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
			selected_list: [],
			available_list: {},
        };

		this.createSelectItems = this.createSelectItems.bind(this);
		this.onDropdownSelected = this.onDropdownSelected.bind(this);
    }
	
	createSelectItems(available_list, selected_list) {
		var items = [];
		var options_count = 0;

		// Add not specified optionn
		items.push(
			<option
				key={options_count}
				value=""
				// Check if the option person is already selected
				disabled={false}>
				Not Specified
			</option>);
		options_count += 1;

		// Add options for the available items
		for (var available_id in available_list) {
			var available_option = available_list[available_id];
			items.push(
				<option
					key={options_count}
					value={available_id}
					// Check if the option person is already selected
					disabled={
						(available_id === this.state.owner_id) ||
						(Object.keys(selected_list).indexOf(available_id) > -1)
					}>
					{available_option.name}
				</option>);

			options_count += 1;
		}
		return items;
	}  
   
	onDropdownSelected(event, available_list, selected_list) {
		var selected_id = event.target.value;

		// Check if option was selected
		if(Object.keys(selected_list).indexOf(selected_id) <= -1) {
			// Get option information
			var selected_option = available_list[selected_id];

			// Add option to the list of selected options
			var temp = selected_list;
			temp[selected_option.id] = this.props.project_type;
			this.props.updateSelectedOptions(temp);
		}
	}

	render() {
        return (
			<div className="form-group">
				<label htmlFor="partnerName">Partner Name:</label>
				<select
					label="partnerName"
					className="form-control"
					onChange={(event) => this.onDropdownSelected(event, this.props.available_list, this.props.selected_list)}
					multiple>
					{this.createSelectItems(this.props.available_list, this.props.selected_list)}
				</select>
			</div>
		);
	}
}

export default ProjectSelectInput;