import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import MeetupList from "./MeetupList";
import AlgoliaPlaces from "./AlgoliaPlaces";

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    radius: PropTypes.number
  };

  componentDidMount() {
    // Check if we should fetch data immediately
    // If there is a hash in the URL
    if (window.location.hash.length > 1) {
      this.props.home.locationToSearch = decodeURI(window.location.hash.substr(1));
      window.requestAnimationFrame(() => {
        this.fetchData(); // Fetch after element is rendered
      });
    }
  }

  fetchData() {
    window.location.hash = encodeURI(this.props.home.locationToSearch);
    this.props.actions.fetchMeetupList({
      location: this.props.home.locationToSearch,
      latlng: this.props.home.latlng,
      radius: this.props.home.radius || 50
    });
  }

  render() {
    const { changeLocation, changeRadius, locationKeyDown } = this.props.actions;
    return (
      <div className="home-default-page">
        <p>This tool will help you find tech Meetups in a given city by searching for the city name.</p>
        <p>Default search radius is 50 miles, you can adjust it below</p>
        <p>Enter the name of a city and hit the "Search" button</p>
        <AlgoliaPlaces 
        labelText={"City :"} 
        options={{type: "city", style: false}} 
        onChange={changeLocation} 
        autocompleteOptions={{autoselect: true}}
        defaultValue={decodeURI(window.location.hash.substr(1))}
        placeholder="ie: Ottawa, Canada" />

        <select onChange={changeRadius}>
          <option disabled value="false">Search Radius</option>
          <option value="10">10 miles</option>
          <option value="25">25 miles</option>
          <option value="50">50 miles</option>
          <option value="100">100 miles</option>
        </select>

        <button onClick={this.fetchData.bind(this)}>Search</button>
        {this.props.home.fetchMeetupListPending && 
          <p>Loading...</p>
        }
        {this.props.home.meetupList !== null && this.props.home.meetupList.length > 0 && 
          <MeetupList />
        }
        {this.props.home.meetupList && this.props.home.meetupList.length == 0 && 
          <p>No tech-related Meetups found </p>
        }
        {this.props.home.fetchMeetupListError && 
          <div>
            <p>Ugh, something went wrong...</p>
            <p className="error">{this.props.home.fetchMeetupListError.toString()}</p>
          </div>
        }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
