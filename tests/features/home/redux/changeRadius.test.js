import { expect } from 'chai';

import {
  HOME_CHANGE_RADIUS,
} from 'src/features/home/redux/constants';

import {
  changeRadius,
  reducer,
} from 'src/features/home/redux/changeRadius';

describe('home/redux/changeRadius', () => {
  it('returns correct action by changeRadius', () => {
    expect(changeRadius()).to.have.property('type', HOME_CHANGE_RADIUS);
  });

  it('handles action type HOME_CHANGE_RADIUS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CHANGE_RADIUS }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
