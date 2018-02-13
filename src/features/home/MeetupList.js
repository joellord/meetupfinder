import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

function formattedDate(timestamp) {
  if (!timestamp) return "";
  let date = new Date(timestamp);
  let breakDown = date.toString().split(" ");

  return breakDown[1] + " " + breakDown[2] + " " + breakDown[3];
}

export class MeetupList extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-meetup-list">
        <br/><br/>
        <table>
          <thead>
            <tr>
              <th>Meetup Name</th>
              <th>Date Created</th>
              <th>Location</th>
              <th># Members</th>
              <th>Last Event</th>
              <th>Next Event</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.props.home.meetupList.map((i) => {return (
              <tr key={i.id}>
                <td><a href={i.link} target="_blank">{i.name}</a></td>
                <td>{formattedDate(i.created)}</td>
                <td><a href={"https://www.google.com/maps/?q=" + i.coords.lat + "," + i.coords.lon} target="_blank">{i.location}</a></td>
                <td>{i.members} {i.who}</td>
                <td>{formattedDate(i.lastEvent.time)}</td>
                <td>{formattedDate(i.nextEvent.time)}</td>
                <td>{Math.round(i.score/225*100) + " %"}</td>
              </tr>            
            )})}
          </tbody>
        </table>
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
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetupList);
