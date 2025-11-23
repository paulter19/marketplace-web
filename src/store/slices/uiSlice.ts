import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    toast: {
        message: string;
        type: 'success' | 'error' | 'info';
        isVisible: boolean;
    };
}

const initialState: UiState = {
    toast: {
        message: '',
        type: 'info',
        isVisible: false,
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<{ message: string; type?: 'success' | 'error' | 'info' }>) => {
            state.toast = {
                message: action.payload.message,
                type: action.payload.type || 'info',
                isVisible: true,
            };
        },
        hideToast: (state) => {
            state.toast.isVisible = false;
        },
    },
});

export const { showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
