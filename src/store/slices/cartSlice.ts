import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../../types';

interface CartState {
    items: CartItem[];
    total: number;
}

const initialState: CartState = {
    items: [],
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item =>
                item.id === action.payload.id &&
                JSON.stringify(item.selectedOptions) === JSON.stringify(action.payload.selectedOptions)
            );

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }

            // Recalculate total with bulk discounts
            state.total = state.items.reduce((sum, item) => {
                let price = item.price;
                if (item.isSale && item.discount) {
                    price = price * (1 - item.discount / 100);
                }

                // Apply bulk discount if applicable
                if (item.bulkDiscounts) {
                    const discount = item.bulkDiscounts
                        .sort((a, b) => b.quantity - a.quantity)
                        .find(d => item.quantity >= d.quantity);

                    if (discount) {
                        price = price * (1 - discount.discountPercent / 100);
                    }
                }

                return sum + (price * item.quantity);
            }, 0);
        },
        removeFromCart: (state, action: PayloadAction<{ id: string; selectedOptions?: { [key: string]: string } }>) => {
            state.items = state.items.filter(item =>
                !(item.id === action.payload.id &&
                    JSON.stringify(item.selectedOptions) === JSON.stringify(action.payload.selectedOptions))
            );

            // Recalculate total
            state.total = state.items.reduce((sum, item) => {
                let price = item.price;
                if (item.isSale && item.discount) {
                    price = price * (1 - item.discount / 100);
                }

                // Apply bulk discount if applicable
                if (item.bulkDiscounts) {
                    const discount = item.bulkDiscounts
                        .sort((a, b) => b.quantity - a.quantity)
                        .find(d => item.quantity >= d.quantity);

                    if (discount) {
                        price = price * (1 - discount.discountPercent / 100);
                    }
                }

                return sum + (price * item.quantity);
            }, 0);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number; selectedOptions?: { [key: string]: string } }>) => {
            const item = state.items.find(item =>
                item.id === action.payload.id &&
                JSON.stringify(item.selectedOptions) === JSON.stringify(action.payload.selectedOptions)
            );

            if (item) {
                item.quantity = Math.max(1, action.payload.quantity);

                // Recalculate total
                state.total = state.items.reduce((sum, item) => {
                    let price = item.price;
                    if (item.isSale && item.discount) {
                        price = price * (1 - item.discount / 100);
                    }

                    // Apply bulk discount if applicable
                    if (item.bulkDiscounts) {
                        const discount = item.bulkDiscounts
                            .sort((a, b) => b.quantity - a.quantity)
                            .find(d => item.quantity >= d.quantity);

                        if (discount) {
                            price = price * (1 - discount.discountPercent / 100);
                        }
                    }

                    return sum + (price * item.quantity);
                }, 0);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
