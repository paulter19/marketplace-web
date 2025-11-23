import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from 'lucide-react';
import { RootState } from '../../store';
import { setSelectedCategory, setSortBy, setPriceRange, setMinRating } from '../../store/slices/productsSlice';
import { CATEGORIES } from '../../data/mockData';

const ProductFilters: React.FC = () => {
    const dispatch = useDispatch();
    const { selectedCategory, sortBy } = useSelector((state: RootState) => state.products);

    return (
        <div className="space-y-8">
            {/* Sort By */}
            <div>
                <h3 className="font-bold text-lg mb-4">Sort By</h3>
                <select
                    value={sortBy}
                    onChange={(e) => dispatch(setSortBy(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                    <option value="best-selling">Best Selling</option>
                    <option value="newest">Newest Arrivals</option>
                </select>
            </div>

            {/* Categories */}
            <div>
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="cat-all"
                            name="category"
                            checked={selectedCategory === null}
                            onChange={() => dispatch(setSelectedCategory(null))}
                            className="w-4 h-4 text-yellow-400 focus:ring-yellow-400 border-slate-300"
                        />
                        <label htmlFor="cat-all" className="ml-2 text-slate-700 cursor-pointer">All Categories</label>
                    </div>
                    {CATEGORIES.map(cat => (
                        <div key={cat} className="flex items-center">
                            <input
                                type="radio"
                                id={`cat-${cat}`}
                                name="category"
                                checked={selectedCategory === cat}
                                onChange={() => dispatch(setSelectedCategory(cat))}
                                className="w-4 h-4 text-yellow-400 focus:ring-yellow-400 border-slate-300"
                            />
                            <label htmlFor={`cat-${cat}`} className="ml-2 text-slate-700 cursor-pointer">{cat}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price (Mock) */}
            <div>
                <h3 className="font-bold text-lg mb-4">Price</h3>
                <div className="space-y-2 text-sm text-slate-600">
                    <p onClick={() => dispatch(setPriceRange(null))} className="cursor-pointer hover:text-yellow-600 font-medium">Any Price</p>
                    <p onClick={() => dispatch(setPriceRange([0, 25]))} className="cursor-pointer hover:text-yellow-600">Under $25</p>
                    <p onClick={() => dispatch(setPriceRange([25, 50]))} className="cursor-pointer hover:text-yellow-600">$25 to $50</p>
                    <p onClick={() => dispatch(setPriceRange([50, 100]))} className="cursor-pointer hover:text-yellow-600">$50 to $100</p>
                    <p onClick={() => dispatch(setPriceRange([100, 200]))} className="cursor-pointer hover:text-yellow-600">$100 to $200</p>
                    <p onClick={() => dispatch(setPriceRange([200, Infinity]))} className="cursor-pointer hover:text-yellow-600">$200 & Above</p>
                </div>
            </div>

            {/* Rating */}
            <div>
                <h3 className="font-bold text-lg mb-4">Customer Review</h3>
                <div className="space-y-2">
                    <div onClick={() => dispatch(setMinRating(null))} className="cursor-pointer hover:text-yellow-600 text-sm mb-2 font-medium">Any Rating</div>
                    {[4, 3, 2, 1].map(rating => (
                        <div key={rating} onClick={() => dispatch(setMinRating(rating))} className="flex items-center cursor-pointer hover:opacity-80">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < rating ? "currentColor" : "none"}
                                        className={i < rating ? "" : "text-slate-300"}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-slate-600">& Up</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;
