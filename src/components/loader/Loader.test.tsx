import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('renders without crashing', () => {
    render(<Loader />);
  });

  it('renders the progress bar', () => {
    const { getByText } = render(<Loader isProgressVisible />);
    expect(getByText(/%$/)).toBeInTheDocument();
  });
});
