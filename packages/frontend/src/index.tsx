import '@babel/polyfill';
import 'core-js/es/set';
import 'core-js/stable';
import React from 'react';
import { render } from 'react-dom';
import { AppView } from './routes';
import 'scss/index.scss';

const appRoot = document.getElementById('app-r--root');

// document.addEventListener('DOMContentLoaded', function() {
render(<AppView />, appRoot);
// });
