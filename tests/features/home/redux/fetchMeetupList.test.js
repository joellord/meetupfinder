import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_FETCH_MEETUP_LIST_BEGIN,
  HOME_FETCH_MEETUP_LIST_SUCCESS,
  HOME_FETCH_MEETUP_LIST_FAILURE,
  HOME_FETCH_MEETUP_LIST_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  fetchMeetupList,
  dismissFetchMeetupListError,
  reducer,
} from 'src/features/home/redux/fetchMeetupList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchMeetupList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchMeetupList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchMeetupList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_MEETUP_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_MEETUP_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchMeetupList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchMeetupList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_MEETUP_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_MEETUP_LIST_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchMeetupListError', () => {
    const expectedAction = {
      type: HOME_FETCH_MEETUP_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchMeetupListError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_FETCH_MEETUP_LIST_BEGIN correctly', () => {
    const prevState = { fetchMeetupListPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_MEETUP_LIST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchMeetupListPending).to.be.true;
  });

  it('handles action type HOME_FETCH_MEETUP_LIST_SUCCESS correctly', () => {
    const prevState = { fetchMeetupListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_MEETUP_LIST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchMeetupListPending).to.be.false;
  });

  it('handles action type HOME_FETCH_MEETUP_LIST_FAILURE correctly', () => {
    const prevState = { fetchMeetupListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_MEETUP_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchMeetupListPending).to.be.false;
    expect(state.fetchMeetupListError).to.exist;
  });

  it('handles action type HOME_FETCH_MEETUP_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchMeetupListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_MEETUP_LIST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchMeetupListError).to.be.null;
  });
});
