import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { formatTagsForDatabase } from './AliasTags';
import TagInput from './TagInput';
import { formatListAsTags } from './TagHelper';
import fire from './../../fire';
import './../../CSS/Tag.css';

class AliasTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  componentDidMount() {
    var self = this;

    // Get tags
    if(this.props.id) {
      var aliasesRef = fire.database().ref("agencies").child(this.props.id).child("aliases");
      aliasesRef.on("value", function(data) {
        var aliases = data.val() ? Object.values(data.val()) : [];

        self.setState({ tags: formatListAsTags(aliases) });
      });
    }
  }

  handleDelete(i) {
    var tags = this.state.tags.filter((tag, index) => index !== i);
    var updatedTags = tags.map((tag) => {
      return tag.text;
    });
    fire.database().ref("agencies").child(this.props.id).child("aliases")
    .set(updatedTags);
  }

  handleAddition(tag) {
    var tags = [...this.state.tags, ...[tag]];
    var updatedTags = [];
    for(var tag_id in tags) {
      var cur_tag = tags[tag_id];
      updatedTags[cur_tag.text] = cur_tag.text;
    }
    fire.database().ref("agencies").child(this.props.id).child("aliases")
    .set(updatedTags);
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    var updatedTags = newTags.map((tag) => {
      return tag.text;
    });

    fire.database().ref("agencies").child(this.props.id).child("aliases")
    .set(updatedTags);
  }

  handleTagClick(index) {
    // Do nothing
  }

  render() {
    return (
      <TagInput
        tags={(this.props.shouldStore === false) ? this.props.tags : this.state.tags}
        suggestions={this.state.suggestions}
        handleAddition={this.props.handleAddition ? this.props.handleAddition : this.handleAddition}
        handleDelete={this.props.handleDelete ? this.props.handleDelete : this.handleDelete}
        handleDrag={this.props.handleDrag ? this.props.handleDrag : this.handleDrag}
        handleTagClick={this.props.handleTagClick ? this.props.handleTagClick : this.handleTagClick}
        readOnly={this.props.readOnly}
      />
    );
  }
}

export default AliasTags;
