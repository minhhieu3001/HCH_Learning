import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notiCount: 0,
};

const notificationSlice = createSlice({
  name: 'handle_count_notification',
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.notiCount = action.payload;
    },
  },
});

export const {setCount} = notificationSlice.actions;

export default notificationSlice.reducer;
