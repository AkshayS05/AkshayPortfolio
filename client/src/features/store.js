import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import ratingReducer from "./rating/ratingSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    rating: ratingReducer,
  },
});
export default store;
