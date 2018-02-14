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
          Crafted by <img src={require("../../images/auth0logo.png")} />
        </span>
      </div>
    );
  }
}
