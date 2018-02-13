// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_CHANGE_LOCATION,
} from './constants';

export function changeLocation(event) {
  return {
    type: HOME_CHANGE_LOCATION,
    location: event.target.value
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CHANGE_LOCATION:
      return {
        ...state,
        locationToSearch: action.location
      };

    default:
      return state;
  }
}
