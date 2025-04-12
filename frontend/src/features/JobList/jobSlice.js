// jobSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedJob: null, // Ensure this property exists
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.selectedJob = action.payload; // Update selectedJob with the payload
    },
  },
});

export const { addJob } = jobSlice.actions;
export default jobSlice.reducer;
