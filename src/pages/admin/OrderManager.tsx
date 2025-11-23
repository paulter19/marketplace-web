import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check, Truck, X, Package, Clock } from 'lucide-react';
import { RootState } from '../../store';
import { updateOrderStatus } from '../../store/slices/ordersSlice';
import { Order } from '../../types';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

const OrderManager: React.FC = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state: RootState) => state.orders);

    const handleStatusUpdate = (id: string, status: Order['status']) => {
        dispatch(updateOrderStatus({ id, status }));
    };

    const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
        switch (currentStatus) {
            case 'pending': return 'processing';
            case 'processing': return 'shipped';
            case 'shipped': return 'out-for-delivery';
            case 'out-for-delivery': return 'delivered';
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Order Management</h1>

                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Customer</th>
                                    <th className="px-4 py-3">Items</th>
                                    <th className="px-4 py-3">Total</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium">{order.id}</td>
                                        <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">User {order.userId}</td>
                                        <td className="px-4 py-3">{order.items.length} items</td>
                                        <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant={
                                                order.status === 'delivered' ? 'success' :
                                                    order.status === 'out-for-delivery' ? 'info' :
                                                        order.status === 'shipped' ? 'info' :
                                                            order.status === 'processing' ? 'warning' : 'default'
                                            }>
                                                {order.status.toUpperCase().replace(/-/g, ' ')}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                                                    className="text-xs border-slate-300 rounded focus:ring-yellow-400 focus:border-yellow-400 p-1"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="out-for-delivery">Out for Delivery</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>

                                                {getNextStatus(order.status) && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status)!)}
                                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                        title={`Advance to ${getNextStatus(order.status)}`}
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OrderManager;
