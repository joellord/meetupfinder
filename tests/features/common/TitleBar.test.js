import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TitleBar } from 'src/features/common';

describe('common/TitleBar', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <TitleBar />
    );

    expect(
      renderedComponent.find('.common-title-bar').getElement()
    ).to.exist;
  });
});
