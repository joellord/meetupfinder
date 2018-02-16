import React, { Component } from 'react';

export default class TitleBar extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-title-bar">
        <span className="left">
          <img src={require('../../images/logo.png')} />
        </span>
        <span className="right crafted-by">
          <a href="http://auth0.com/?utm_source=meetupfinder&utm_medium=es&utm_campaign=landing_page" target="_blank">
            Crafted by <img src={require("../../images/auth0logo.png")} />
          </a>
        </span>
      </div>
    );
  }
}
