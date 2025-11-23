import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: {
        id: 'user-1',
        name: 'Demo User',
        email: 'user@example.com',
        isAdmin: false, // Toggle this to true to test admin features
    },
    isAuthenticated: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAdmin: (state) => {
            if (state.user) {
                state.user.isAdmin = !state.user.isAdmin;
            }
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { toggleAdmin, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
