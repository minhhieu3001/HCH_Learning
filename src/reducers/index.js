import {combineReducers} from 'redux';

import visibleTabNav from './Visible/visibleTabNav';

const rootReducer = combineReducers({
  visibleTabNav: visibleTabNav,
});

export default rootReducer;
