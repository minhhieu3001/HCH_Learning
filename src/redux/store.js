import {configureStore} from '@reduxjs/toolkit';
import pointSlice from './slice/pointSlice';
import tabNavSlice from './slice/tabNavSlice';
import menuPopUpSlice from './slice/menuPopUpSlice';
import notificationSlice from './slice/notificationSlice';

export const store = configureStore({
  reducer: {
    pointSlice: pointSlice,
    notification: notificationSlice,
    tabNav: tabNavSlice,
    menuPopUp: menuPopUpSlice,
  },
});
