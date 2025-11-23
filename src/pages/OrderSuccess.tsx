import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const OrderSuccess: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-md">
                <Card className="text-center p-8">
                    <div className="flex justify-center mb-6">
                        <CheckCircle size={64} className="text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Order Placed Successfully!</h1>
                    <p className="text-slate-600 mb-8">
                        Thank you for your purchase. Your order has been received and is being processed.
                    </p>
                    <div className="space-y-3">
                        <Link to="/orders" className="block">
                            <Button className="w-full">View My Orders</Button>
                        </Link>
                        <Link to="/" className="block">
                            <Button variant="secondary" className="w-full">Continue Shopping</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OrderSuccess;
