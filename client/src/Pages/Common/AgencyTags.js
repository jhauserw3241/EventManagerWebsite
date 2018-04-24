import React, { Component } from 'react';
import { render } from 'react-dom';
import TagInput from './TagInput';
import fire from './../../fire';
import './../../CSS/Tag.css';
import { WithContext as ReactTags } from 'react-tag-input';

class AgencyTags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
    };
  }

  componentWillMount() {
    var self = this;

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

  render() {
    return (
      <TagInput
        tags={this.props.tags}
        suggestions={this.state.suggestions}
        readOnly={this.props.readOnly}
      />
    );
  }
}

export default AgencyTags;
