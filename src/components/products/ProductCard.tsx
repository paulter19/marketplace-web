import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { addToCart } from '../../store/slices/cartSlice';
import { showToast } from '../../store/slices/uiSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { RootState } from '../../store';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const isWishlisted = wishlistItems.includes(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        dispatch(addToCart({ ...product, quantity: 1 }));
        dispatch(showToast({ message: 'Added to Cart', type: 'success' }));
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(toggleWishlist(product.id));
        dispatch(showToast({
            message: isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist',
            type: 'info'
        }));
    };

    return (
        <Link to={`/products/${product.id}`} className="group block bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative">
            <button
                onClick={handleToggleWishlist}
                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-red-500 transition-colors"
            >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : ""} />
            </button>
            <div className="aspect-square overflow-hidden bg-slate-50 p-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform group-hover:scale-105"
                />
                {product.isSale && (
                    <div className="absolute top-2 left-2">
                        <Badge variant="danger">
                            {product.discount}% OFF
                        </Badge>
                    </div>
                )}
                {product.isNew && (
                    <div className="absolute top-2 right-2">
                        <Badge variant="success">
                            NEW
                        </Badge>
                    </div>
                )}

            </div>

            <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-slate-900 font-medium line-clamp-2 mb-1 hover:text-yellow-600 transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                className={i < Math.floor(product.rating) ? "" : "text-slate-300"}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-slate-500 ml-1">({product.reviews})</span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2">
                    <div>
                        <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
                        {product.isSale && (
                            <span className="text-sm text-slate-400 line-through ml-2">
                                ${(product.price / (1 - (product.discount || 0) / 100)).toFixed(2)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 p-2 rounded-full transition-colors"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
