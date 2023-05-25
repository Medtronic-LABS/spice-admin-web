import React from 'react';
import { mount } from 'enzyme';
import RenderFieldGroups from '../RenderFieldGroups';

describe('RenderFieldGroups', () => {
  let wrapper:any
  const props = {
    obj: {
      viewType: 'default',
      field1: { type: 'text', label: 'Field 1' },
      field2: { type: 'number', label: 'Field 2' },
    },
    name: 'form',
    form: {},
    unAddedFields: [],
    targetIds: [],
    isNew: true,
    newlyAddedIds: [],
    handleUpdateFieldName: jest.fn(),
    isAccountCustomization: false,
    hashFieldIdsWithTitle: {},
    hashFieldIdsWithFieldName: {},
  };

  beforeEach(() => {
    wrapper = mount(
        <RenderFieldGroups {...props} />
    )
  });

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a list of RenderFields with correct props', () => {
    const renderFields = wrapper.find('RenderFields');

    expect(renderFields).toHaveLength(0);

    expect(renderFields.at(0)).toEqual({});

    expect(renderFields.at(1)).toEqual({});
  });
});
