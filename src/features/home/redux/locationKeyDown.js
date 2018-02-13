// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_LOCATION_KEY_DOWN,
} from './constants';
import {
  fetchMeetupList
} from "./actions";

export function locationKeyDown(e) {
  return dispatch => {
    if (e.keyCode == 13) {
      e.target.setAttribute("data-location", e.target.value)
      dispatch(fetchMeetupList(e));
    }
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_LOCATION_KEY_DOWN:
      return {
        ...state,
      };

    default:
      return state;
  }
}
