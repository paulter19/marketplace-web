import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';
import { MOCK_PRODUCTS } from '../../data/mockData';

interface ProductsState {
    items: Product[];
    filteredItems: Product[];
    searchQuery: string;
    selectedCategory: string | null;
    priceRange: [number, number] | null;
    minRating: number | null;
    sortBy: string;
}

const initialState: ProductsState = {
    items: MOCK_PRODUCTS,
    filteredItems: MOCK_PRODUCTS,
    searchQuery: '',
    selectedCategory: null,
    priceRange: null,
    minRating: null,
    sortBy: 'featured',
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            productsSlice.caseReducers.filterProducts(state);
        },
        setSelectedCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
            productsSlice.caseReducers.filterProducts(state);
        },
        setPriceRange: (state, action: PayloadAction<[number, number] | null>) => {
            state.priceRange = action.payload;
            productsSlice.caseReducers.filterProducts(state);
        },
        setMinRating: (state, action: PayloadAction<number | null>) => {
            state.minRating = action.payload;
            productsSlice.caseReducers.filterProducts(state);
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
            productsSlice.caseReducers.sortProducts(state);
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload);
            productsSlice.caseReducers.filterProducts(state);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
                productsSlice.caseReducers.filterProducts(state);
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(p => p.id !== action.payload);
            productsSlice.caseReducers.filterProducts(state);
        },
        filterProducts: (state) => {
            let temp = [...state.items];

            // Filter by active status (if implemented later, for now assume all active or check property)
            temp = temp.filter(p => p.isActive !== false);

            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                temp = temp.filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
                );
            }

            if (state.selectedCategory) {
                temp = temp.filter(p => p.category === state.selectedCategory);
            }

            if (state.priceRange) {
                const [min, max] = state.priceRange;
                temp = temp.filter(p => p.price >= min && (max === Infinity ? true : p.price <= max));
            }

            if (state.minRating) {
                temp = temp.filter(p => p.rating >= state.minRating!);
            }

            state.filteredItems = temp;
            productsSlice.caseReducers.sortProducts(state);
        },
        sortProducts: (state) => {
            switch (state.sortBy) {
                case 'price-asc':
                    state.filteredItems.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    state.filteredItems.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    state.filteredItems.sort((a, b) => b.rating - a.rating);
                    break;
                case 'best-selling':
                    state.filteredItems.sort((a, b) => (b.sales || 0) - (a.sales || 0));
                    break;
                case 'newest':
                    state.filteredItems.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
                    break;
                default:
                    break;
            }
        }
    },
});

export const {
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setMinRating,
    setSortBy,
    addProduct,
    updateProduct,
    deleteProduct
} = productsSlice.actions;

export default productsSlice.reducer;
