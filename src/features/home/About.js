import React, { Component } from 'react';

export default class About extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="home-about">
        <h3>About MeetUp Finder</h3>
        <p>
          When I travel, I try to find meetups in the city where I am so I can present there.  Unfortunately, Meetup.com makes it hard
          to so such a search.  This is why I came up with this tool.
        </p>
        <p>It's not perfect but it's a start.  Feel free to submit an issue in Github or ask for features there.</p>
        <p>Official page on Github: <a href="http://github.com/joellord/meetupfinder">here</a></p>
        <p>Or contact me directly if you have any questions</p>
        <p><a href="mailto:joelphy@gmail.com">me@joel-lord.com</a></p>
      </div>
    );
  }
}
