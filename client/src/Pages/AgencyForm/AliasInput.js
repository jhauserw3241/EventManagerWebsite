import React, { Component } from 'react';
import AliasTags from './../Common/AliasTags';

class AliasInput extends Component {
	render() {
        return (
			<div className="form-group">
				<label htmlFor="aliases">Aliases:</label>
				<AliasTags
					id={this.props.id}
					tags={this.props.tags}
					shouldStore={this.props.tags ? false : true}
					handleDelete={this.props.handleDelete}
					handleAddition={this.props.handleAddition}
					handleDrag={this.props.handleDrag}
					onError={this.props.onError}
					readOnly={this.props.disabled ? this.props.disabled : false} />
			</div>
		);
	}
}

export default AliasInput;