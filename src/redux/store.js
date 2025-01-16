import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "./reducers/moviesSlice";
import peopleReducer from "./reducers/peopleSlice";
import tvReducer from "./reducers/tvSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    tv: tvReducer,
    people: peopleReducer,
  },
});
