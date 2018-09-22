// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_CHANGE_RADIUS,
} from './constants';

export function changeRadius(query) {
  console.log(query.target.value);
  return {
    type: HOME_CHANGE_RADIUS,
    radius: query.target.value
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CHANGE_RADIUS:
      return {
        ...state,
        radius: action.radius
      };

    default:
      return state;
  }
}
