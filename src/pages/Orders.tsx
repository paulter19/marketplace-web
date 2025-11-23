import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { showToast } from '../store/slices/uiSlice';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const Orders: React.FC = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state: RootState) => state.orders);
    const { user } = useSelector((state: RootState) => state.auth);

    // Filter orders for current user
    const userOrders = orders.filter(order => order.userId === user?.id);

    if (userOrders.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 py-12">
                <div className="container mx-auto px-4">
                    <Card className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">You have no orders</h2>
                        <p className="text-slate-600 mb-8">Looks like you haven't placed any orders yet.</p>
                        <Link to="/">
                            <Button>Start Shopping</Button>
                        </Link>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Your Orders</h1>

                <div className="space-y-6">
                    {userOrders.map(order => (
                        <Card key={order.id} noPadding className="overflow-hidden">
                            <div className="bg-slate-100 p-4 flex flex-col sm:flex-row justify-between text-sm text-slate-600 gap-4">
                                <div className="flex gap-8">
                                    <div>
                                        <span className="block text-xs uppercase font-bold">Order Placed</span>
                                        <span className="text-slate-900">{new Date(order.date).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase font-bold">Total</span>
                                        <span className="text-slate-900">${order.total.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase font-bold">Ship To</span>
                                        <span className="text-blue-600 hover:underline cursor-pointer">{user?.name}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs uppercase font-bold">Order # {order.id}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="font-bold text-lg text-slate-900 mb-1 capitalize flex items-center gap-2">
                                        {order.status === 'delivered' ? 'Delivered' : order.status}
                                        {order.status === 'delivered' && <span className="text-sm font-normal text-slate-500">Package was left near the front door or porch</span>}
                                    </h3>
                                    <Badge variant={
                                        order.status === 'delivered' ? 'success' :
                                            order.status === 'shipped' ? 'info' :
                                                order.status === 'processing' ? 'warning' : 'default'
                                    }>
                                        {order.status.toUpperCase()}
                                    </Badge>
                                </div>

                                <div className="space-y-6">
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-20 h-20 flex-shrink-0 border border-slate-200 rounded p-1">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <Link to={`/products/${item.id}`} className="font-medium text-blue-600 hover:underline line-clamp-2">
                                                    {item.name}
                                                </Link>
                                                <div className="text-sm text-slate-500 mt-1">Quantity: {item.quantity}</div>
                                                <div className="mt-2">
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={() => {
                                                            dispatch(addToCart(item));
                                                            dispatch(showToast({ message: 'Added to Cart', type: 'success' }));
                                                        }}
                                                    >
                                                        Buy it again
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
