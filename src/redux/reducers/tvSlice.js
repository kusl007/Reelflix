import { createSlice } from "@reduxjs/toolkit";

// Define the initial state

const initialState = {
  info: null,
};

// Define the slice

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    setTvInfo: (state, action) => {
      state.info = action.payload;
    },
    clearTvInfo: (state) => {
      state.info = null;
    },
  },
});

export const {setTvInfo,clearTvInfo} = tvSlice.actions

export default tvSlice.reducer;