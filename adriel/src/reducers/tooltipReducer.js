import { createSlice } from '@reduxjs/toolkit';

const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState: {
    placement: 'top',
  },
  reducers: {
    updatePlacement: (state, action) => {
      state.placement = action.payload;
    },
  },
});

export const { updatePlacement } = tooltipSlice.actions;
export default tooltipSlice.reducer;
