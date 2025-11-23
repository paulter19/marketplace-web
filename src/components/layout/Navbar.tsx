import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Search, Menu, User, LogOut, Package, LayoutDashboard, Heart } from 'lucide-react';
import { RootState } from '../../store';
import { setSearchQuery, setSelectedCategory } from '../../store/slices/productsSlice';
import { CATEGORIES } from '../../data/mockData';
import { logout, toggleAdmin } from '../../store/slices/authSlice';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setSearchQuery(searchTerm));
        navigate('/search');
    };

    const handleCategoryClick = (category: string) => {
        dispatch(setSelectedCategory(category));
        navigate('/products');
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-slate-900 text-white sticky top-0 z-50">
            {/* Top Bar */}
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-slate-900 font-bold">M</div>
                        MarketPlace
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
                        <div className="flex w-full">
                            <select
                                className="bg-slate-100 text-slate-900 px-3 rounded-l-md border-r border-slate-300 focus:outline-none text-sm cursor-pointer hover:bg-slate-200"
                                onChange={(e) => handleCategoryClick(e.target.value)}
                            >
                                <option value="">All</option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-2 text-slate-900 focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-yellow-400 text-slate-900 px-6 rounded-r-md hover:bg-yellow-500 transition-colors"
                            >
                                <Search size={20} />
                            </button>
                        </div>
                    </form>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        {/* Admin Toggle (Mock) */}
                        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
                            <span>Admin:</span>
                            <button
                                onClick={() => dispatch(toggleAdmin())}
                                className={`w-8 h-4 rounded-full transition-colors ${user?.isAdmin ? 'bg-green-500' : 'bg-slate-600'} relative`}
                            >
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${user?.isAdmin ? 'left-4.5' : 'left-0.5'}`} />
                            </button>
                        </div>

                        {/* Account */}
                        <div className="relative group cursor-pointer">
                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-xs text-slate-300">Hello, {isAuthenticated ? user?.name.split(' ')[0] : 'Sign in'}</span>
                                <span className="font-bold text-sm flex items-center gap-1">
                                    Account <User size={14} />
                                </span>
                            </div>

                            {/* Dropdown */}
                            <div className="absolute right-0 top-full pt-2 hidden group-hover:block w-48">
                                <div className="bg-white text-slate-900 rounded-md shadow-xl py-2">
                                    {isAuthenticated ? (
                                        <>
                                            {user?.isAdmin && (
                                                <Link to="/admin" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100">
                                                    <LayoutDashboard size={16} /> Dashboard
                                                </Link>
                                            )}
                                            <Link to="/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100">
                                                <Package size={16} /> Orders
                                            </Link>
                                            <button
                                                onClick={() => dispatch(logout())}
                                                className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-slate-100 text-red-600"
                                            >
                                                <LogOut size={16} /> Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <div className="px-4 py-2">
                                            <Link to="/signin">
                                                <button className="w-full bg-yellow-400 py-1 rounded font-bold text-sm mb-2">Sign In</button>
                                            </Link>
                                            <p className="text-xs text-center">New customer? <Link to="/signup" className="text-blue-600 cursor-pointer hover:underline">Start here.</Link></p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Orders Link */}
                        <Link to="/orders" className="hidden md:flex flex-col items-start leading-tight">
                            <span className="text-xs text-slate-300">Returns</span>
                            <span className="font-bold text-sm">& Orders</span>
                        </Link>

                        {/* Wishlist Link */}
                        <Link to="/wishlist" className="hidden md:flex flex-col items-start leading-tight relative">
                            <span className="text-xs text-slate-300">Your</span>
                            <span className="font-bold text-sm">Wishlist</span>
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="flex items-center gap-1 relative">
                            <div className="relative">
                                <ShoppingCart size={28} />
                                <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            </div>
                            <span className="font-bold text-sm mt-3 hidden md:block">Cart</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar (Categories) */}
            <div className="bg-slate-800 text-sm">
                <div className="container mx-auto px-4 h-10 flex items-center gap-6 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-1 font-bold hover:text-white text-slate-200"
                    >
                        <Menu size={20} /> All
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className="whitespace-nowrap hover:text-white text-slate-200"
                        >
                            {cat}
                        </button>
                    ))}
                    <Link to="/products" className="whitespace-nowrap hover:text-white text-slate-200">Today's Deals</Link>
                    <Link to="/products" className="whitespace-nowrap hover:text-white text-slate-200">Customer Service</Link>
                    <Link to="/products" className="whitespace-nowrap hover:text-white text-slate-200">Registry</Link>
                    <Link to="/products" className="whitespace-nowrap hover:text-white text-slate-200">Gift Cards</Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="w-80 bg-white h-full text-slate-900 overflow-y-auto">
                        <div className="bg-slate-900 text-white p-4 font-bold flex items-center gap-2">
                            <User size={20} /> Hello, {isAuthenticated ? user?.name : 'Sign in'}
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">Shop By Category</h3>
                            <ul className="space-y-2">
                                {CATEGORIES.map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => handleCategoryClick(cat)}
                                            className="w-full text-left py-2 px-2 hover:bg-slate-100 rounded"
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 bg-black/50" onClick={() => setIsMenuOpen(false)} />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
