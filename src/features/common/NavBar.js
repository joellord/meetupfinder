import React, { Component } from 'react';

export default class NavBar extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-nav-bar">
        <ul>
            <li><a href="/">Find Meetups</a></li>
            <li><a href="/about">About This App</a></li>
        </ul>
      </div>
    );
  }
}
