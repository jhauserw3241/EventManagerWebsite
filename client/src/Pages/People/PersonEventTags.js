import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TagInput from './../Common/TagInput';
import fire from './../../fire';
import './../../CSS/Tag.css';

class PersonEventTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: this.props.tags,
      suggestions: [],
      redirect: false,
    };

    this.getSharedEvents = this.getSharedEvents.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  componentWillMount() {
    this.getSharedEvents();
  }

  getSharedEvents() {
    var self = this;

    var event_ids = [];
    var event_names = [];

    if(!fire.auth().currentUser) {
        return;
    }

    var cur_user_id = fire.auth().currentUser.uid;

    fire.database().ref("users").child(self.props.id).child("events").on("value", function(person_events_data) {
        var person_event_ids = person_events_data.val() ? Object.values(person_events_data.val()) : {};

        fire.database().ref("users").child(cur_user_id).child("events").on("value", function(cur_user_events_data) {
            var cur_user_event_ids = cur_user_events_data.val() ? Object.values(cur_user_events_data.val()) : {};

            for(var person_event_index in person_event_ids) {
                for(var cur_user_event_index in cur_user_event_ids) {
                    var person_event_id = person_event_ids[person_event_index];
                    var cur_user_event_id = cur_user_event_ids[cur_user_event_index];
                    // Check if the event is shared
                    if(person_event_id === cur_user_event_id) {
                        event_ids.push(cur_user_event_id);
                    }
                }
            }
            
            // Get event name
            fire.database().ref("events").once("value", function(data) {
                var events = data.val() ? Object.values(data.val()) : [];

                for(var id_index in event_ids) {
                    var id = event_ids[id_index];
                    for(var event_index in events) {
                        var event = events[event_index];
                        if(id === event.id) {
                            event_names.push(event.name);
                        }
                    }
                }
            })

            self.setState({ tags: event_names.map(name => {
              return {
                id: name,
                text: name,
              }
            })
          });
        });
    });
}

  handleDelete(i) {
    var tags = this.state.tags.filter((tag, index) => index !== i);
    var updatedTags = tags.map((tag) => {
      return tag.text;
    });
    fire.database().ref("users").child(this.props.id).child("events")
    .set(updatedTags);
  }

  handleAddition(tag) {
    var tags = [...this.state.tags, ...[tag]];
    var updatedTags = [];
    for(var tag_id in tags) {
      var cur_tag = tags[tag_id];
      updatedTags[cur_tag.text] = cur_tag.text;
    }
    fire.database().ref("users").child(this.props.id).child("events")
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

    fire.database().ref("users").child(this.props.id).child("events")
    .set(updatedTags);
  }

  handleTagClick(index) {
    console.log('The tag at index ' + index + ' was clicked');
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return(<Redirect to="/events" />);
    }

    return (
      <TagInput
        tags={(this.props.shouldStore === false) ? this.props.tags : this.state.tags}
        suggestions={this.state.suggestions}
        handleAddition={this.props.handleAddition ? this.props.handleAddition : this.handleAddition}
        handleDelete={this.props.handleDelete ? this.props.handleDelete : this.handleDelete}
        handleDrag={this.props.handleDrag ? this.props.handleDrag : this.handleDrag}
        handleTagClick={this.props.handleTagClick ? this.props.handleTagClick : this.handleTagClick}
        readOnly={this.props.readOnly} />
    );
  }
}

export default PersonEventTags;
