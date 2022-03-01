/* @refresh reload */
import { render } from 'solid-js/web';
import { AppView } from './routes';
import '@scss/index.scss';

const appRoot = document.getElementById('root');

if (appRoot) render(AppView, appRoot);
