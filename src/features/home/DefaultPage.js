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
  };

  componentDidMount() {
  }

  fetchData() {
    this.props.actions.fetchMeetupList({
      location: this.props.home.locationToSearch,
      latlng: this.props.home.latlng
    });
  }

  render() {
    const { changeLocation, locationKeyDown } = this.props.actions;
    return (
      <div className="home-default-page">
        <p>This tool will help you find tech Meetups in a given city by searching for the city name.</p>
        <p>Enter the name of a city and hit the "Search" button</p>
        <AlgoliaPlaces 
        labelText={"City :"} 
        options={{type: "city", style: false}} 
        onChange={changeLocation} 
        autocompleteOptions={{autoselect: true}}
        placeholder="ie: Ottawa, Canada" />

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
