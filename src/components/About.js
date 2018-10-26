import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div>
        <h2>About MeetUp Finder</h2>
        <p>
          When I travel, I try to find meetups in the city where I am so I can present there. Unfortunately, Meetup.com makes it hard to do such a search. This is why I came up with this tool.
        </p>
        <p>
          It's not perfect but it's a start. Feel free to submit an issue in Github or ask for features there.
        </p>
        <p>
          Official page on Github:
          &nbsp;<a href="https://github.com/joellord/meetupfinder">here</a>
        </p>
        <p>
          Or contact me directly if you have any questions
          &nbsp;<a href="mailto:me@joel-lord.com">me@joel-lord.com</a>
        </p>
      </div>
    );
  }
}