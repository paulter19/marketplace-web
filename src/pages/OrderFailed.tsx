import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const OrderFailed: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-md">
                <Card className="text-center p-8">
                    <div className="flex justify-center mb-6">
                        <AlertCircle size={64} className="text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Order Placement Failed</h1>
                    <p className="text-slate-600 mb-8">
                        We encountered an issue while processing your order. Please try again or contact support.
                    </p>
                    <div className="space-y-3">
                        <Link to="/checkout" className="block">
                            <Button className="w-full">Try Again</Button>
                        </Link>
                        <Link to="/" className="block">
                            <Button variant="secondary" className="w-full">Return to Home</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OrderFailed;
