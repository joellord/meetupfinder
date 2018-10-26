import React, { Component } from "react";
import store from "../utils/Store";
import { formattedDate } from "../utils/helpers";

export default class MeetupList extends Component {
  constructor(props) {
    super(props);

    this.state = store.getGlobalState();
    this.updateState = this.updateState.bind(this);
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

  render() {
    return(
      <div className="row home-meetup-list">
        <div className="col-12">
          <br/><br/>

          {this.state.isLoading &&
            <p>Loading...</p>
          }

          {!this.state.isLoading && this.state.meetups.length > 0 &&
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
              {this.state.meetups.map((i) => {return (
                <tr key={i.id}>
                  <td><a href={i.link} rel="noopener noreferrer" target="_blank">{i.name}</a></td>
                  <td>{formattedDate(i.created)}</td>
                  <td><a href={"https://www.google.com/maps/?q=" + i.coords.lat + "," + i.coords.lon} rel="noopener noreferrer" target="_blank">{i.location}</a></td>
                  <td>{i.members} {i.who}</td>
                  <td>{formattedDate(i.lastEvent.time)}</td>
                  <td>{formattedDate(i.nextEvent.time)}</td>
                  <td>{Math.round(i.score/225*100) + " %"}</td>
                </tr>
              )})}
              </tbody>
            </table>
          }
        </div>
      </div>
    )
  }
}