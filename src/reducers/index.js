import {combineReducers} from 'redux';

import visibleTabNav from './Visible/visibleTabNav';
import visibleMenuPopup from './Visible/visibleMenuPopup';

const rootReducer = combineReducers({
  visibleTabNav: visibleTabNav,
  visibleMenuPopup: visibleMenuPopup,
});

export default rootReducer;
