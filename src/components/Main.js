import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AlgoliaPlaces from 'algolia-places-react';
import { algolia } from "../utils/credentials";
import store from "../utils/Store";
import MeetupList from "./MeetupList";

import { fetchMeetups } from "../utils/MeetupAPI";

class Main extends Component {
  constructor(props) {
    super(props);

    if (props.city) {
      store.updateGlobalState({city: props.city});
      fetchMeetups();
    } else {
      store.updateGlobalState({
        city: "City",
        radius: 50,
        isLoading: false,
        latlng: {},
        searchEnabled: false,
        meetups: []
      });
    }

    this.state = store.getGlobalState();
    this.updateState = this.updateState.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
  }

  componentWillMount() {
    store.subscribe(this.updateState);
  }

  componentWillUnmount() {
    store.unsubscribe(this.updateState);
  }

  updateState() {
    this.setState(store.getGlobalState());
  }

  handleCityChange({ query, rawAnswer, suggestion, suggestionIndex }) {
    store.updateGlobalState({
      searchEnabled: true,
      city: suggestion.value,
      latlng: suggestion.latlng
    });
    this.props.history.push(`/${suggestion.value}`);
  }

  handleCityKeyEvent(e) {
    store.updateGlobalState({
      city: e.target.value,
      searchEnabled: e.keyCode === 13,
      latlng: {}
    });
  }

  handleSearch() {
    fetchMeetups();
  }

  handleRadiusChange(e) {
    store.updateGlobalState({radius: e.target.value});
  }

  render() {
    let distances = [10, 25, 50, 100];

    return (
      <div className="">
        <div className="row">
          <div className="col-12">
            <p>
              This tool will help you find tech Meetups in a given city by searching for the city name.
            </p>
            <p>
              Default search radius is 50 miles, you can adjust it below.
            </p>
            <p>
              Enter the name of a city and hit the "Search" button.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <form className="form-inline">
                <div className="form-group col-6 force-full-width">
                  <AlgoliaPlaces
                    placeholder={this.state.city}
                    options={{
                      appId: algolia.appId,
                      apiKey: algolia.apiKey,
                      language: "en",
                      type: 'city'
                    }}
                    onChange={this.handleCityChange}
                    onKeyUp={this.handleCityKeyEvent}
                  />
                </div>
                <div className="form-group col-2 mx-sm-3 mb-2">
                  <select
                    className="form-control"
                    value={this.state.radius}
                    onChange={this.handleRadiusChange}
                  >
                    { distances.map(distance =>
                      <option key={distance} value={distance}>{distance} miles</option>
                    ) }
                  </select>
                </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={this.handleSearch}
                  disabled={!this.state.searchEnabled}
                >Search</button>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <MeetupList/>
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(Main);