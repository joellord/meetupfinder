import initialState from './initialState';
import { reducer as fetchMeetupListReducer } from './fetchMeetupList';
import { reducer as changeLocationReducer } from './changeLocation';
import { reducer as emptyMeetupListReducer } from './emptyMeetupList';
import { reducer as locationKeyDownReducer } from './locationKeyDown';
import { reducer as changeRadiusReducer } from './changeRadius';

const reducers = [
  fetchMeetupListReducer,
  changeLocationReducer,
  emptyMeetupListReducer,
  locationKeyDownReducer,
  changeRadiusReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
