import {createStore} from 'redux';
// import BatReducer from './batReduce';
import rootReducer from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools());

export default store;