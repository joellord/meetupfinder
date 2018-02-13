import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NavBar } from 'src/features/common';

describe('common/NavBar', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <NavBar />
    );

    expect(
      renderedComponent.find('.common-nav-bar').getElement()
    ).to.exist;
  });
});
