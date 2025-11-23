import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { clearCart, removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, total } = useSelector((state: RootState) => state.cart);

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 py-12">
                <div className="container mx-auto px-4">
                    <Card className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your MarketPlace Cart is empty</h2>
                        <p className="text-slate-600 mb-8">Check your Saved for later items below or continue shopping.</p>
                        <Link to="/">
                            <Button>Continue Shopping</Button>
                        </Link>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <Card>
                            <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
                                <span className="text-slate-600">Price</span>
                            </div>
                            {items.map(item => (
                                <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="flex gap-4 py-4 border-b border-slate-200 last:border-0">
                                    <div className="w-24 h-24 flex-shrink-0 border border-slate-200 rounded p-2">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <Link to={`/products/${item.id}`} className="font-medium text-slate-900 hover:underline line-clamp-2 text-sm md:text-base">
                                            {item.name}
                                        </Link>
                                        <div className="text-xs md:text-sm text-slate-500 mt-1">
                                            {item.selectedOptions && Object.entries(item.selectedOptions).map(([key, value]) => (
                                                <span key={key} className="mr-3 block sm:inline">
                                                    {key}: <span className="font-medium text-slate-700">{value}</span>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-xs md:text-sm text-green-600 mt-1">In Stock</div>
                                        <div className="mt-2 flex items-center gap-4">
                                            <div className="flex items-center border border-slate-300 rounded">
                                                <select
                                                    value={item.quantity}
                                                    onChange={(e) => dispatch(updateQuantity({
                                                        id: item.id,
                                                        quantity: Number(e.target.value),
                                                        selectedOptions: item.selectedOptions
                                                    }))}
                                                    className="p-1 bg-transparent focus:outline-none text-xs md:text-sm"
                                                >
                                                    {[...Array(10)].map((_, i) => (
                                                        <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <span className="text-slate-300">|</span>
                                            <button
                                                onClick={() => dispatch(removeFromCart({ id: item.id, selectedOptions: item.selectedOptions }))}
                                                className="text-xs md:text-sm text-slate-500 hover:text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">${item.price.toFixed(2)}</div>
                                        {item.isSale && item.discount && (
                                            <div className="text-sm text-slate-500 line-through">
                                                ${(item.price / (1 - item.discount / 100)).toFixed(2)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-end pt-4 mt-4 border-t border-slate-200">
                                <div className="text-xl">
                                    Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items):
                                    <span className="font-bold ml-2">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </Card>

                        <div className="mt-4 flex justify-end">
                            <Button variant="outline" onClick={() => dispatch(clearCart())} size="sm">
                                Clear Cart
                            </Button>
                        </div>
                    </div>

                    {/* Summary / Checkout */}
                    <div className="w-full lg:w-80">
                        <Card>
                            <div className="text-lg mb-4">
                                Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items):
                                <span className="font-bold block text-xl mt-1">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <input type="checkbox" id="gift" className="rounded border-slate-300 text-yellow-400 focus:ring-yellow-400" />
                                <label htmlFor="gift" className="text-sm text-slate-700">This order contains a gift</label>
                            </div>
                            <Button
                                onClick={() => navigate('/checkout')}
                                className="w-full"
                            >
                                Proceed to Checkout
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
