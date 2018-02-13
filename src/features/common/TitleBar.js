import React, { Component } from 'react';

export default class TitleBar extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-title-bar">
        <h1>Meetup Finder</h1>
        <h2>A tool to help you find meetups by location</h2>
      </div>
    );
  }
}
