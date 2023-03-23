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
    minusPoint: (state, action) => {
      state.data = state.data - action.payload;
    },
  },
});

export const {setData, minusPoint} = pointSlice.actions;

export default pointSlice.reducer;
