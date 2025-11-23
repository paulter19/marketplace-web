import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Edit, Trash2, X, PauseCircle, PlayCircle } from 'lucide-react';
import { RootState } from '../../store';
import { addProduct, updateProduct, deleteProduct } from '../../store/slices/productsSlice';
import { Product } from '../../types';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { CATEGORIES } from '../../data/mockData';

const ProductManager: React.FC = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [customCategory, setCustomCategory] = useState('');

    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        description: '',
        price: 0,
        category: CATEGORIES[0],
        image: '',
        stock: 0,
        rating: 0,
        reviews: 0,
        isActive: true
    });

    // Reset custom category when modal opens or category changes
    useEffect(() => {
        if (formData.category !== 'Other') {
            setCustomCategory('');
        }
    }, [formData.category]);

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData(product);
            // Check if the product's category is in the predefined list
            if (!CATEGORIES.includes(product.category)) {
                setFormData({ ...product, category: 'Other' });
                setCustomCategory(product.category);
            }
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: 0,
                category: CATEGORIES[0],
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', // Default placeholder
                stock: 0,
                rating: 0,
                reviews: 0,
                isActive: true
            });
            setCustomCategory('');
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalCategory = formData.category === 'Other' ? customCategory : formData.category;

        if (formData.category === 'Other' && !customCategory.trim()) {
            alert('Please enter a custom category');
            return;
        }

        const productData = { ...formData, category: finalCategory };

        if (editingProduct) {
            dispatch(updateProduct({ ...productData, id: editingProduct.id } as Product));
        } else {
            dispatch(addProduct({ ...productData, id: Date.now().toString() } as Product));
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    const handleToggleActive = (product: Product) => {
        dispatch(updateProduct({ ...product, isActive: !product.isActive }));
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Product Management</h1>
                    <Button onClick={() => handleOpenModal()}>
                        <Plus size={20} className="mr-2" /> Add Product
                    </Button>
                </div>

                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3">Image</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Stock</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(product => (
                                    <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-4 py-3">
                                            <img src={product.image} alt={product.name} className="w-10 h-10 object-contain rounded bg-white border border-slate-200" />
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-900 max-w-xs truncate">{product.name}</td>
                                        <td className="px-4 py-3">{product.category}</td>
                                        <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col gap-1">
                                                <span className={`px-2 py-1 rounded-full text-xs w-fit ${product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                    {product.stock} in stock
                                                </span>
                                                {product.isActive === false && (
                                                    <span className="px-2 py-1 rounded-full text-xs w-fit bg-slate-100 text-slate-600">
                                                        Paused
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleToggleActive(product)}
                                                    className={`p-1 rounded ${product.isActive !== false ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}
                                                    title={product.isActive !== false ? "Pause Product" : "Resume Product"}
                                                >
                                                    {product.isActive !== false ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModal(product)}
                                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                    title="Edit Product"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center p-4 border-b border-slate-200">
                                <h2 className="text-lg font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-700">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                <Input
                                    label="Product Name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        rows={3}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Price"
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                        required
                                    />
                                    <Input
                                        label="Stock"
                                        type="number"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {formData.category === 'Other' && (
                                    <Input
                                        label="Custom Category Name"
                                        value={customCategory}
                                        onChange={e => setCustomCategory(e.target.value)}
                                        required
                                        placeholder="Enter category name"
                                    />
                                )}

                                <Input
                                    label="Image URL"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    required
                                />

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Or Upload Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData({ ...formData, image: reader.result as string });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-yellow-50 file:text-yellow-700
                                            hover:file:bg-yellow-100"
                                    />
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="flex-1">{editingProduct ? 'Update' : 'Create'}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductManager;
