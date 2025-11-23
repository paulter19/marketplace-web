import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
    items: string[]; // Array of product IDs
}

// Load initial state from localStorage
const loadState = (): WishlistState => {
    try {
        const serializedState = localStorage.getItem('wishlist');
        if (serializedState === null) {
            return { items: [] };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { items: [] };
    }
};

const initialState: WishlistState = loadState();

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            const index = state.items.indexOf(productId);
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(productId);
            }
            // Save to localStorage
            localStorage.setItem('wishlist', JSON.stringify(state));
        },
    },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
