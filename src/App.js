import React, { Component } from 'react';
import './App.css';
import TitleBar from "./components/TitleBar";
import LeftNav from "./components/LeftNav";
import Main from "./components/Main";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container-fluid">
          <div className="">
            <div className="row">
              <div className="col-12">
                <TitleBar/>
              </div>
            </div>

            <div className="row">
              <div className="col-3">
                <LeftNav/>
              </div>
              <div className="col-9 finder">
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route path="/about" component={About} />
                  <Route path="/:city" render={(props) => <Main city={props.match.params.city} />} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
