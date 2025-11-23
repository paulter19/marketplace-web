import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types';
import { MOCK_REVIEWS } from '../../data/mockData';

interface ReviewsState {
    reviews: Review[];
}

const initialState: ReviewsState = {
    reviews: MOCK_REVIEWS,
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        addReview: (state, action: PayloadAction<Review>) => {
            state.reviews.unshift(action.payload);
        },
    },
});

export const { addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
