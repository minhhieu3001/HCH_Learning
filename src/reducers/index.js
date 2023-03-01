import {combineReducers} from 'redux';

import visibleTabNav from './Visible/visibleTabNav';
import visibleMenuPopup from './Visible/visibleMenuPopup';
import socket from './socket';

const rootReducer = combineReducers({
  visibleTabNav: visibleTabNav,
  visibleMenuPopup: visibleMenuPopup,
  socket: socket,
});

export default rootReducer;
