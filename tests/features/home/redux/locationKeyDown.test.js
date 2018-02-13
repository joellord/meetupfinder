import { expect } from 'chai';

import {
  HOME_LOCATION_KEY_DOWN,
} from 'src/features/home/redux/constants';

import {
  locationKeyDown,
  reducer,
} from 'src/features/home/redux/locationKeyDown';

describe('home/redux/locationKeyDown', () => {
  it('returns correct action by locationKeyDown', () => {
    expect(locationKeyDown()).to.have.property('type', HOME_LOCATION_KEY_DOWN);
  });

  it('handles action type HOME_LOCATION_KEY_DOWN correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_LOCATION_KEY_DOWN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
