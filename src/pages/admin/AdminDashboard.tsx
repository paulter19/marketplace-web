import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, DollarSign, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { RootState } from '../../store';
import Card from '../../components/common/Card';

const AdminDashboard: React.FC = () => {
    const { items } = useSelector((state: RootState) => state.products);
    const { orders } = useSelector((state: RootState) => state.orders);

    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const lowStockItems = items.filter(item => item.stock < 10);
    const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'processing');

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="flex items-center p-6">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Revenue</p>
                            <p className="text-2xl font-bold text-slate-900">${totalRevenue.toFixed(2)}</p>
                        </div>
                    </Card>

                    <Card className="flex items-center p-6">
                        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Orders</p>
                            <p className="text-2xl font-bold text-slate-900">{orders.length}</p>
                        </div>
                    </Card>

                    <Card className="flex items-center p-6">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Products</p>
                            <p className="text-2xl font-bold text-slate-900">{items.length}</p>
                        </div>
                    </Card>

                    <Card className="flex items-center p-6">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Users</p>
                            <p className="text-2xl font-bold text-slate-900">1,234</p>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
                            <Link to="/admin/orders" className="text-blue-600 hover:underline text-sm">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3">Order ID</th>
                                        <th className="px-4 py-3">Customer</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.slice(0, 5).map(order => (
                                        <tr key={order.id} className="border-b border-slate-100">
                                            <td className="px-4 py-3 font-medium">{order.id}</td>
                                            <td className="px-4 py-3">User {order.userId}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Low Stock Alert */}
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <AlertTriangle size={20} className="text-red-500" />
                                Low Stock Alert
                            </h2>
                            <Link to="/admin/products" className="text-blue-600 hover:underline text-sm">Manage Products</Link>
                        </div>
                        <div className="space-y-4">
                            {lowStockItems.length > 0 ? (
                                lowStockItems.map(item => (
                                    <div key={item.id} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded bg-slate-50" />
                                            <div>
                                                <p className="font-medium text-slate-900 line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-slate-500">ID: {item.id}</p>
                                            </div>
                                        </div>
                                        <span className="text-red-600 font-bold">{item.stock} left</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 text-center py-4">All products are well stocked.</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
