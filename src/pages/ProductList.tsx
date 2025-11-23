import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Filter } from 'lucide-react';
import { RootState } from '../store';
import { setSortBy } from '../store/slices/productsSlice';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';

const ProductList: React.FC = () => {
    const dispatch = useDispatch();
    const { filteredItems, sortBy, searchQuery, selectedCategory } = useSelector((state: RootState) => state.products);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs / Header */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {searchQuery ? `Results for "${searchQuery}"` : selectedCategory || 'All Products'}
                        </h1>
                        <p className="text-slate-500 text-sm">{filteredItems.length} results</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="md:hidden flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
                            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        >
                            <Filter size={16} />
                            Filters
                        </button>
                        <label htmlFor="sort" className="text-sm font-medium text-slate-700 hidden sm:block">Sort by:</label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => dispatch(setSortBy(e.target.value))}
                            className="border-slate-300 rounded-md text-sm focus:ring-yellow-400 focus:border-yellow-400"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Avg. Customer Review</option>
                            <option value="newest">Newest Arrivals</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`w-full md:w-64 flex-shrink-0 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
                        <ProductFilters />
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredItems.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No products found</h3>
                                <p className="text-slate-500">Try adjusting your filters or search query.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
