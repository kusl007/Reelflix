import { createSlice } from "@reduxjs/toolkit";

// Define the initial state

const initialState = {
  info: null,
};

// Define the slice

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeopleInfo: (state, action) => {
      state.info = action.payload;
    },
    clearPeopleInfo: (state) => {
      state.info = null;
    },
  },
});

export const {setPeopleInfo,clearPeopleInfo} = peopleSlice.actions

export default peopleSlice.reducer;