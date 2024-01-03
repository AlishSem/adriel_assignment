import { configureStore } from '@reduxjs/toolkit';
import clockReducer from './reducers/clockReducer';
import tooltipReducer from './reducers/tooltipReducer';

const store = configureStore({
  reducer: {
    clock: clockReducer,
    tooltip: tooltipReducer
  },
});

export default store;