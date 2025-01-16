import { createSlice } from "@reduxjs/toolkit";

// Define the initial state

const initialState = {
  info: null,
};

// Define the slice

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieInfo: (state, action) => {
      state.info = action.payload;
    },
    clearMovieInfo: (state) => {
      state.info = null;
    },
  },
});

export const {setMovieInfo,clearMovieInfo} = movieSlice.actions

export default movieSlice.reducer;