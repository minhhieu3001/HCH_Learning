import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visibleMenuPopup: false,
};

const menuPopUpSlice = createSlice({
  name: 'handle_show_menu_popup',
  initialState,
  reducers: {
    showMenuPopup: (state, action) => {
      state.visibleMenuPopup = action.payload;
    },
    hideMenuPopup: (state, action) => {
      state.visibleMenuPopup = action.payload;
    },
  },
});

export const {showMenuPopup, hideMenuPopup} = menuPopUpSlice.actions;

export default menuPopUpSlice.reducer;
