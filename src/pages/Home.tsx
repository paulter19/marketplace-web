import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import ProductCard from '../components/products/ProductCard';
import { CATEGORIES } from '../data/mockData';

const Home: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.items);

    const featuredProducts = products.slice(0, 4);
    const newArrivals = products.filter(p => p.isNew).slice(0, 4);
    const deals = products.filter(p => p.isSale).slice(0, 4);

    return (
        <div className="bg-slate-100 min-h-screen pb-12">
            {/* Hero Banner */}
            <div className="relative bg-slate-800 h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="container mx-auto px-4 h-full relative z-20 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-2xl">
                        Shop the Latest Tech & Lifestyle Gear
                    </h1>
                    <p className="text-xl text-slate-200 mb-8 max-w-xl">
                        Discover unbeatable deals on electronics, fashion, home essentials, and more.
                    </p>
                    <Link
                        to="/products"
                        className="bg-yellow-400 text-slate-900 px-8 py-3 rounded-md font-bold text-lg w-fit hover:bg-yellow-500 transition-colors"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-30">
                {/* Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {CATEGORIES.slice(0, 4).map((cat, idx) => (
                        <div key={cat} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">{cat}</h3>
                            <div className="aspect-square bg-slate-100 rounded-md mb-4 overflow-hidden">
                                <img
                                    src={`https://source.unsplash.com/random/400x400?${cat.split(' ')[0]}`}
                                    alt={cat}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <Link to="/products" className="text-blue-600 hover:underline text-sm font-medium">See more</Link>
                        </div>
                    ))}
                </div>

                {/* Featured Products */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">Recommended for You</h2>
                        <Link to="/products" className="text-blue-600 hover:underline font-medium">See all</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* Deals */}
                <div className="mb-12 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <span className="bg-red-600 text-white text-sm px-2 py-1 rounded">DEAL</span>
                            Flash Sales
                        </h2>
                        <Link to="/products" className="text-blue-600 hover:underline font-medium">See all deals</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {deals.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* New Arrivals */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">New Arrivals</h2>
                        <Link to="/products" className="text-blue-600 hover:underline font-medium">See all</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {newArrivals.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
