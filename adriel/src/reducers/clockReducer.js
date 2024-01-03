import { createSlice } from '@reduxjs/toolkit';

const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    time: new Date().getTime(),
  },
  reducers: {
    updateTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { updateTime } = clockSlice.actions;
export default clockSlice.reducer;
