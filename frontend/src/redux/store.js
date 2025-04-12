// store.js
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './path-to/jobSlice';

const store = configureStore({
  reducer: {
    job: jobReducer, // Key must match the slice name
  },
});

export default store;
