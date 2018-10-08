import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducer';

const middleware = applyMiddleware(logger());
const store = createStore(rootReducer, middleware);

export default store;