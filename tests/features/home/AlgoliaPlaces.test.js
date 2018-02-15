import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AlgoliaPlaces } from 'src/features/home';

describe('home/AlgoliaPlaces', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <AlgoliaPlaces />
    );

    expect(
      renderedComponent.find('.home-algolia-places').getElement()
    ).to.exist;
  });
});
