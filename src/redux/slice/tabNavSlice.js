import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visibleTabNav: true,
};

const tabNavSlice = createSlice({
  name: 'handle_show_tab_nav',
  initialState,
  reducers: {
    showTabNav: (state, action) => {
      state.visibleTabNav = action.payload;
    },
    hideTabNav: (state, action) => {
      state.visibleTabNav = action.payload;
    },
  },
});

export const {showTabNav, hideTabNav} = tabNavSlice.actions;

export default tabNavSlice.reducer;
