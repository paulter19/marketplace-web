import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import { addOrder } from '../store/slices/ordersSlice';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import { Order } from '../types';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, total } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.auth);
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            const isSuccess = Math.random() > 0.7; // 70% success rate

            if (isSuccess) {
                dispatch(clearCart());
                navigate('/order-success');
            } else {
                navigate('/order-failed');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Card>
                                <h2 className="text-lg font-bold mb-4 border-b border-slate-200 pb-2">1. Shipping Address</h2>
                                <div className="space-y-4">
                                    <Input
                                        label="Full Name"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        label="Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="grid grid-cols-3 gap-4">
                                        <Input
                                            label="City"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            label="State"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            label="ZIP Code"
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <h2 className="text-lg font-bold mb-4 border-b border-slate-200 pb-2">2. Payment Method</h2>
                                <div className="space-y-4">
                                    <Input
                                        label="Card Number"
                                        name="cardNumber"
                                        placeholder="0000 0000 0000 0000"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Expiry Date"
                                            name="expiry"
                                            placeholder="MM/YY"
                                            value={formData.expiry}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            label="CVV"
                                            name="cvv"
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </Card>

                            <Button
                                type="submit"
                                className="w-full md:hidden"
                                isLoading={isProcessing}
                            >
                                Place Order (${total.toFixed(2)})
                            </Button>
                        </form>
                    </div>

                    <div className="w-full md:w-80">
                        <Card className="sticky top-24">
                            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                            <div className="space-y-2 text-sm mb-4">
                                <div className="flex justify-between">
                                    <span>Items ({items.reduce((acc, item) => acc + item.quantity, 0)}):</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping & Handling:</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax:</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between font-bold text-lg text-red-700">
                                    <span>Order Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button
                                onClick={handleSubmit}
                                className="w-full"
                                isLoading={isProcessing}
                            >
                                Place Order
                            </Button>
                            <p className="text-xs text-slate-500 mt-4 text-center">
                                By placing your order, you agree to MarketPlace's privacy notice and conditions of use.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
