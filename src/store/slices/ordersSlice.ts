import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';
import { MOCK_ORDERS } from '../../data/mockData';

interface OrdersState {
    orders: Order[];
}

const initialState: OrdersState = {
    orders: MOCK_ORDERS,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload);
        },
        updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
            const order = state.orders.find(o => o.id === action.payload.id);
            if (order) {
                order.status = action.payload.status;
            }
        },
    },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
