import { expect } from 'chai';

import {
  HOME_CHANGE_LOCATION,
} from 'src/features/home/redux/constants';

import {
  changeLocation,
  reducer,
} from 'src/features/home/redux/changeLocation';

describe('home/redux/changeLocation', () => {
  it('returns correct action by changeLocation', () => {
    expect(changeLocation()).to.have.property('type', HOME_CHANGE_LOCATION);
  });

  it('handles action type HOME_CHANGE_LOCATION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CHANGE_LOCATION }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
