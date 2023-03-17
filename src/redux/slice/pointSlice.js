import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const pointSlice = createSlice({
  name: 'update_point',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setData} = pointSlice.actions;

export default pointSlice.reducer;
