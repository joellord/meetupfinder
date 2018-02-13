import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { MeetupList } from 'src/features/home/MeetupList';

describe('home/MeetupList', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MeetupList {...props} />
    );

    expect(
      renderedComponent.find('.home-meetup-list').getElement()
    ).to.exist;
  });
});
