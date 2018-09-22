import axios from 'axios';
import {
  HOME_FETCH_MEETUP_LIST_BEGIN,
  HOME_FETCH_MEETUP_LIST_SUCCESS,
  HOME_FETCH_MEETUP_LIST_FAILURE,
  HOME_FETCH_MEETUP_LIST_DISMISS_ERROR,
  HOME_EMPTY_MEETUP_LIST,
} from './constants';

const url = 'https://wt-13aebf4eeaa9913542725d4a90e4d49e-0.run.webtask.io/meetupfinder/meetups';

export function fetchMeetupList(args = {}) {
  let locationToSearch = args.location;
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: HOME_FETCH_MEETUP_LIST_BEGIN,
    });

    dispatch({
      type: HOME_EMPTY_MEETUP_LIST,
    });

    const promise = new Promise((resolve, reject) => {
      let localUrl = url;
      if (args.latlng) {
        localUrl += `?lat=${args.latlng.lat}&lon=${args.latlng.lng}`;
      } else {
        localUrl += `?location=${locationToSearch}`;
      }
      localUrl += `&radius=${args.radius}`;
      axios.get(localUrl).then(
        res => {
          dispatch({
            type: HOME_FETCH_MEETUP_LIST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: HOME_FETCH_MEETUP_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchMeetupListError() {
  return {
    type: HOME_FETCH_MEETUP_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_MEETUP_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchMeetupListPending: true,
        fetchMeetupListError: null,
      };

    case HOME_FETCH_MEETUP_LIST_SUCCESS:
      // The request is success

      //Process Meetup data
      var maxMembers = 0;
      let meetups = action.data.map(i => {
        if (i.members > maxMembers) maxMembers = i.members;
        if (i.status !== 'active' && i.visibility !== 'public') {
          return undefined;
        } else {
          return {
            id: i.id,
            name: i.name,
            link: i.link,
            description: i.description,
            created: i.created,
            location: i.city + ', ' + i.state + ', ' + i.country,
            coords: { lat: i.lat, lon: i.lon },
            members: i.members,
            who: i.who,
            nextEvent: i.next_event ? i.next_event : { time: undefined, yes_rsvp_count: 0 },
            lastEvent: i.last_event ? i.last_event : { time: undefined, yes_rsvp_count: 0 },
            score: 0,
          };
        }
      });

      meetups = meetups
        .map(m => {
          let d = new Date().getTime();
          // 100 points for last meetup in the last 30 days
          // 75 points for last meetup in the last 60 days
          // 50 points for last meetup exists
          // 25 points for next meetup
          // 1-100 ratio to max members
          let ratio = m.members * 100 / maxMembers;
          m.score += m.lastEvent.time ? 50 : 0;
          let daysSinceLastEvent = Math.floor((d - m.lastEvent.time) / 1000 / 60 / 60 / 24);
          m.score += daysSinceLastEvent < 60 ? 25 : 0;
          m.score += daysSinceLastEvent < 30 ? 25 : 0;
          m.score += m.nextEvent.time ? 25 : 0;
          m.score += ratio;
          return m;
        })
        .sort((a, b) => {
          if (a.score < b.score) return 1;
          if (b.score < a.score) return -1;
          return 0;
        });

      return {
        ...state,
        fetchMeetupListPending: false,
        fetchMeetupListError: null,
        meetupList: meetups,
      };

    case HOME_FETCH_MEETUP_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchMeetupListPending: false,
        fetchMeetupListError: action.data.error,
      };

    case HOME_FETCH_MEETUP_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchMeetupListError: null,
      };

    default:
      return state;
  }
}
