import React, { Component } from 'react';
import { render } from 'react-dom';
import './../../CSS/Tag.css';
import { WithContext as ReactTags } from 'react-tag-input';

class TagInput extends Component {
  render() {
    return (
      <div>
        <ReactTags
          tags={this.props.tags || []}
          suggestions={this.props.suggestions || []}
          handleDelete={this.props.handleDelete}
          handleAddition={this.props.handleAddition}
          handleDrag={this.props.handleDrag}
          handleTagClick={this.props.handleTagClick}
          disabled
          readOnly={this.props.readOnly ? this.props.readOnly : false}
        />
      </div>
    );
  }
}

export default TagInput;
