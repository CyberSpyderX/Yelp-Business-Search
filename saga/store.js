import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {dataReducer, networkReducer} from './reducers';
import sagas from './sagas';

const rootReducer = combineReducers({dataReducer, networkReducer});

const sagaMiddleware = createSagaMiddleware();
export default createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);
