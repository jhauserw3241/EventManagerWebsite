import React, { Component } from 'react';
import { render } from 'react-dom';
import  { Redirect } from 'react-router-dom';
import TagInput from './TagInput';
import fire from './../../fire';
import './../../CSS/Tag.css';
import { WithContext as ReactTags } from 'react-tag-input';

class PersonAgencyTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: this.props.tags,
      suggestions: [],
      redirect: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  componentWillMount() {
    var self = this;

    // Get tags
    if(this.props.id) {
      fire.database().ref("users").child(this.props.id).child("agencies").on("value", function(data) {
        var agencies = data.val() ? Object.values(data.val()) : [];
  
        var updatedAgencies = agencies.map((agency) => {
          return {
            id: agency,
            text: agency,
          };
        });
  
        self.setState({ tags: updatedAgencies });
      });
    }

    // Get suggestions
    fire.database().ref("agencies").on("value", function(data) {
      var agencies = data.val() ? Object.values(data.val()) : [];

      var updatedAgencies = agencies.map((agency) => {
        return {
          id: agency.name,
          text: agency.name,
        };
      });

      self.setState({ suggestions: updatedAgencies });
    })
  }

  handleDelete(i) {
    console.log("handle delete triggered")
    var tags = this.state.tags.filter((tag, index) => index !== i);
    var updatedTags = tags.map((tag) => {
      return tag.text;
    });
    fire.database().ref("users").child(this.props.id).child("agencies")
    .set(updatedTags);
  }

  handleAddition(tag) {
    var tags = [...this.state.tags, ...[tag]];
    var updatedTags = [];
    for(var tag_id in tags) {
      var tag = tags[tag_id];
      updatedTags[tag.text] = tag.text;
    }
    fire.database().ref("users").child(this.props.id).child("agencies")
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

    fire.database().ref("users").child(this.props.id).child("agencies")
    .set(updatedTags);
  }

  handleTagClick(index) {
    console.log('The tag at index ' + index + ' was clicked');
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return(<Redirect to="/agencies" />);
    }

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

export default PersonAgencyTags;
