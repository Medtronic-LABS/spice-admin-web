// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

global.React = React;
configure({ adapter: new Adapter() });

// const { window } = new JSDOM('<!doctype html><html><body></body></html>');
// (global as any).window = window;
// (global as any).document = window.document;
// (global as any).navigator = {
//   userAgent: 'node.js',
// };