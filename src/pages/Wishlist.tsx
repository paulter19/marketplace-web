import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { RootState } from '../store';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/common/Button';

const Wishlist: React.FC = () => {
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const { items: allProducts } = useSelector((state: RootState) => state.products);

    const products = allProducts.filter(p => wishlistItems.includes(p.id));

    if (products.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="bg-white rounded-lg shadow-sm p-12 max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart size={40} className="text-slate-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Wishlist is Empty</h2>
                        <p className="text-slate-600 mb-8">Save items you love to your wishlist. Review them anytime and easily move them to the cart.</p>
                        <Link to="/">
                            <Button size="lg">Start Shopping</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Heart className="text-red-500" fill="currentColor" />
                    My Wishlist ({products.length})
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
