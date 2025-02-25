import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: [], // array of all reviews
  avgRating: null, // the average rating
  isLoading: false,
  error: null,
};

/** Fetch all reviews + average rating from your backend */
export const fetchAllReviews = createAsyncThunk(
  "rating/fetchAllReviews",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reviews/get`,
        {
          withCredentials: true, // if you need cookies
        }
      );
      // The backend returns { avgRating, reviews }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);
/** Add a new review (rating + testimonial). The user must be logged in. */
export const addReview = createAsyncThunk(
  "rating/addReview",
  async ({ rating, testimonial }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reviews/add`,
        { rating, testimonial },
        { withCredentials: true }
      );
      return response.data; // new review
    } catch (err) {
      // We'll handle this error in the component, so no need to set global error
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);
// deleteReview
export const deleteReview = createAsyncThunk(
  "rating/deleteReview",
  async (reviewId, thunkAPI) => {
    try {
      // Ensure the URL has "http://" at the beginning
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/reviews/delete/${reviewId}`,
        {
          withCredentials: true,
        }
      );
      return reviewId; // Return the ID so we can remove from state
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);
export const updateReview = createAsyncThunk(
  "rating/updateReview",
  async ({ reviewId, rating, testimonial }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/reviews/update/${reviewId}`,
        { rating, testimonial },
        { withCredentials: true }
      );
      return response.data.review;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllReviews
      .addCase(fetchAllReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.avgRating = action.payload.avgRating;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // addReview
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // The newly created review is returned
        // Optionally push it into state.reviews
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (r) => r._id !== action.payload.reviewId
        );
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const updatedReview = action.payload;
        const idx = state.reviews.findIndex((r) => r._id === updatedReview._id);
        if (idx !== -1) {
          state.reviews[idx] = updatedReview;
        }
      });
  },
});

export default ratingSlice.reducer;
