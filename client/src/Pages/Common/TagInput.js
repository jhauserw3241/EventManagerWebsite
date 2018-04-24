import React, { Component } from 'react';
import { render } from 'react-dom';
import './../../CSS/Tag.css';
import { WithContext as ReactTags } from 'react-tag-input';

class AgencyTags extends Component {
  constructor(props) {
    super(props);

    //var tags = (!Array.isArray(this.props.tags)) ? this.props.tags : [];
    var tags = (this.props.tags && (this.props.tags.length > 0)) ? this.props.tags : [{id: "test", text:"test"}];
    //[{id: "test", text:"test"}]

    console.log(this.props.tags);
    this.state = {
      tags: tags,
      suggestions: this.props.suggestions,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });

    if(this.props.handleDelete) {
      this.props.handleDelete();
    }
  }

  handleAddition(tag) {
    const { tags } = this.state;
    this.setState({ tags: [...tags, ...[tag]] });

    if(this.props.handleAddition) {
      this.props.handleAddition();
    }
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });

    if(this.props.handleDrag) {
      this.props.handleDrag();
    }
  }

  handleTagClick(index) {
    console.log('The tag at index ' + index + ' was clicked');

    if(this.props.handleTagClick) {
      this.props.handleTagClick();
    }
  }

  render() {
    console.log(this.props.tags);
    console.log(Array.isArray(this.props.tags));
    console.log(this.state.tags);
    const { tags, suggestions } = this.state;
    console.log(tags);
    return (
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
          disabled
          readOnly={this.props.readOnly ? this.props.readOnly : false}
        />
      </div>
    );
  }
}

export default AgencyTags;
