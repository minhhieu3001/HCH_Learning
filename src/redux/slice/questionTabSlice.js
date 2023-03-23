import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visible: true,
};

const questionTabSlice = createSlice({
  name: 'update_question_tab',
  initialState,
  reducers: {
    showQuestionNav: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const {showQuestionNav} = questionTabSlice.actions;

export default questionTabSlice.reducer;
