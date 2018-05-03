import React, { Component } from 'react';
import { itemInList } from './List';
import TagInput from './TagInput';
import { formatListAsTags } from './TagHelper';
import fire from './../../fire';
import './../../CSS/Tag.css';

class AgencyPeopleTags extends Component {
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

    var peopleRef = fire.database().ref("users");
    peopleRef.on("value", function(data) {
      var people = data.val() ? Object.values(data.val()) : [];
      var peopleNames = people.map(person =>
      {
        return person.first_name + " " + person.last_name;
      });

      self.setState({ suggestions: peopleNames ? formatListAsTags(peopleNames) : [] });

      if(self.props.id) {
        var peopleRef = fire.database().ref("agencies").child(self.props.id).child("people");
        peopleRef.on("value", function(data) {
          // Get IDs of associated people
          var people_ids = data.val() ? Object.values(data.val()) : [];

          // Get names of associated people
          var associatedPeople = people.filter(person => itemInList(person.id, people_ids));
          var associatedPeopleNames = associatedPeople.map(person => {
            return person.first_name + " " + person.last_name;
          });

          self.setState({ tags: associatedPeopleNames ? formatListAsTags(associatedPeopleNames) : [] });
        });
      }
    });
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

export default AgencyPeopleTags;
