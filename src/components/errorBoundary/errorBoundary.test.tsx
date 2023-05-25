import React from 'react';
import { shallow, mount } from 'enzyme';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <div>Hello World</div>
      </ErrorBoundary>
    );
    expect(wrapper.contains(<div>Hello World</div>)).toBe(true);
  });

  it('renders error message when there is an error', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <div>{null}</div>
      </ErrorBoundary>
    );
    wrapper.setState({ hasError: true });
    expect(wrapper.containsMatchingElement(<h2>We&apos;re sorry, something went wrong. Please try after sometime.</h2>)).toBe(true);
  });

  it('renders custom error message when provided', () => {
    const wrapper = shallow(
      <ErrorBoundary message="Oops!">
        <div>{null}</div>
      </ErrorBoundary>
    );
    wrapper.setState({ hasError: true });
    expect(wrapper.containsMatchingElement(<h2>Oops!</h2>)).toBe(true);
  });

  it('resets state when pathname changes', () => {
    const wrapper = mount(
      <ErrorBoundary pathname="/old">
        <div>{null}</div>
      </ErrorBoundary>
    );
    wrapper.setState({ hasError: true });
    expect(wrapper.state('hasError')).toBe(true);
    wrapper.setProps({ pathname: '/new' });
    expect(wrapper.state('hasError')).toBe(false);
  });
});
