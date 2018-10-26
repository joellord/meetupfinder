import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LeftNav extends Component {
  render() {
    return (
      <div className="left-nav">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Find Meetups
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About MeetupFinder
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}