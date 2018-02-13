import React, { Component } from 'react';

export default class TitleBar extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-title-bar">
        <img src={require('../../images/logo.png')} />
      </div>
    );
  }
}
