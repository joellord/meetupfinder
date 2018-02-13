import { expect } from 'chai';

import {
  HOME_EMPTY_MEETUP_LIST,
} from 'src/features/home/redux/constants';

import {
  emptyMeetupList,
  reducer,
} from 'src/features/home/redux/emptyMeetupList';

describe('home/redux/emptyMeetupList', () => {
  it('returns correct action by emptyMeetupList', () => {
    expect(emptyMeetupList()).to.have.property('type', HOME_EMPTY_MEETUP_LIST);
  });

  it('handles action type HOME_EMPTY_MEETUP_LIST correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_EMPTY_MEETUP_LIST }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
