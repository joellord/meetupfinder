import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TitleBar from "../common/TitleBar";
import NavBar from "../common/NavBar";

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    return (
      <div className="home-app hg">
        <header className="hg__header titlebar">
            <TitleBar />
        </header>
        <main className="hg__main page-container">
            {this.props.children}
        </main>
        <aside className="hg__left navbar">
            <NavBar />
        </aside>
        <footer className="hg__footer">
            &copy; 2018 - Joel Lord &lt;<a href="mailto:me@joel-lord.com">me@joel-lord.com</a>&gt; - <a href="https://github.com/joellord/meetupfinder" target="_blank">View Source</a>
        </footer>
      </div>
    );
  }
}
