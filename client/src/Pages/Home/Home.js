import React, { Component } from 'react';
import './../../CSS/Page.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <p className="Home-intro">
          Welcome! This website is a tool to help you organize information about large events.<br />
          <br />
          To interact with any events, you need to login.
        </p>
      </div>
    );
  }
}

export default Home;
