// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_EMPTY_MEETUP_LIST,
} from './constants';

export function emptyMeetupList() {
  return {
    type: HOME_EMPTY_MEETUP_LIST,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_EMPTY_MEETUP_LIST:
      return {
        ...state,
        meetupList: null
      };

    default:
      return state;
  }
}
