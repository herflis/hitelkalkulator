import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Reducers } from './Reducers';
import { Actions } from './Actions';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const ltp = Reducers.ltp;
const homeLoan = Reducers.homeLoan;

const myReducer = combineReducers({
  ltp,
  homeLoan
});

const logger = createLogger();

let store = createStore(
  myReducer,
  {},
  applyMiddleware(logger)
);
store.dispatch(Actions.InitCalculator());

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
