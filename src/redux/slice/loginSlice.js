import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogin: null,
};

const loginSlice = createSlice({
  name: 'handle_login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const {setLogin} = loginSlice.actions;

export default loginSlice.reducer;
