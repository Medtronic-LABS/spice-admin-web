import React from 'react';

import OopsImg from '../../assets/images/oops.png';

interface IErrorBoundaryProps {
  message?: string;
  children: string | React.ReactElement | React.ReactElement[];
  pathname?: string;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: object, errorInfo: object) {
    console.error(error, errorInfo);
  }

  componentDidUpdate(prevProps: IErrorBoundaryProps) {
    if (prevProps.pathname !== this.props.pathname) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <img src={OopsImg} alt='oopsImg' className='w-100' />
          <h2 className='text-center'>
            {this.props.message || `We're sorry, something went wrong. Please try after sometime.`}
          </h2>
        </>
      );
    }
    return this.props.children;
  }
}
