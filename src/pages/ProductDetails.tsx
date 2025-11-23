import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ShoppingCart, ArrowLeft, Check, AlertCircle, Heart } from 'lucide-react';
import { RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { showToast } from '../store/slices/uiSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProductReviews from '../components/products/ProductReviews';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.products);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const product = items.find(p => p.id === id);

    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product?.options) {
            const initialOptions: { [key: string]: string } = {};
            Object.keys(product.options).forEach(key => {
                if (product.options && product.options[key].length > 0) {
                    initialOptions[key] = product.options[key][0];
                }
            });
            setSelectedOptions(initialOptions);
        }
    }, [product]);

    if (!product) {
        return <div className="container mx-auto px-4 py-8">Product not found</div>;
    }

    const handleOptionChange = (key: string, value: string) => {
        setSelectedOptions(prev => ({ ...prev, [key]: value }));
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            ...product,
            quantity,
            selectedOptions
        }));
        dispatch(showToast({ message: 'Added to Cart', type: 'success' }));
    };

    const discountedPrice = product.isSale && product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

    // Calculate active bulk discount
    const activeBulkDiscount = product.bulkDiscounts
        ?.sort((a, b) => b.quantity - a.quantity)
        .find(d => quantity >= d.quantity);

    const finalPrice = activeBulkDiscount
        ? discountedPrice * (1 - activeBulkDiscount.discountPercent / 100)
        : discountedPrice;

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-slate-600 hover:text-slate-900 mb-6"
            >
                <ArrowLeft size={20} className="mr-2" />
                Back to Results
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="bg-white rounded-lg p-8 border border-slate-200">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-contain max-h-[500px]"
                    />
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={20}
                                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                    className={i < Math.floor(product.rating) ? "" : "text-slate-300"}
                                />
                            ))}
                        </div>
                        <span className="text-slate-600 text-sm">({product.reviews} ratings)</span>
                        {product.isSale && (
                            <Badge variant="danger">Sale</Badge>
                        )}
                    </div>

                    <p className="text-slate-700 mb-6 leading-relaxed">{product.description}</p>

                    <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-4xl font-bold text-slate-900">${finalPrice.toFixed(2)}</span>
                        {product.isSale && product.discount && (
                            <>
                                <span className="text-xl text-slate-500 line-through">${product.price.toFixed(2)}</span>
                                <span className="text-lg font-semibold text-red-600">
                                    {product.discount}% Off
                                </span>
                            </>
                        )}
                    </div>

                    {activeBulkDiscount && (
                        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-md mb-6">
                            <AlertCircle size={20} />
                            <span className="text-sm">
                                Buy {activeBulkDiscount.quantity} or more to get an extra {activeBulkDiscount.discountPercent}% off!
                            </span>
                        </div>
                    )}

                    {/* Variations */}
                    {product.options && Object.keys(product.options).map(key => (
                        <div key={key} className="mb-6">
                            <h3 className="font-bold text-slate-900 mb-2">{key}</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.options![key].map(option => (
                                    <button
                                        key={option}
                                        onClick={() => handleOptionChange(key, option)}
                                        className={`px-4 py-2 rounded border ${selectedOptions[key] === option
                                            ? 'border-yellow-400 bg-yellow-50 text-yellow-900 font-medium'
                                            : 'border-slate-300 text-slate-600 hover:border-slate-400'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-32">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 pt-6 flex gap-3">
                            <Button
                                className="flex-1 flex items-center justify-center gap-2 py-2 md:py-3 text-base md:text-lg"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                <ShoppingCart size={20} className="md:w-6 md:h-6" />
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                            <button
                                onClick={() => {
                                    dispatch(toggleWishlist(product.id));
                                    dispatch(showToast({
                                        message: wishlistItems.includes(product.id) ? 'Removed from Wishlist' : 'Added to Wishlist',
                                        type: 'info'
                                    }));
                                }}
                                className="px-3 md:px-4 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-600 transition-colors"
                                title="Add to Wishlist"
                            >
                                <Heart size={20} className={`md:w-6 md:h-6 ${wishlistItems.includes(product.id) ? "text-red-500" : ""}`} fill={wishlistItems.includes(product.id) ? "currentColor" : "none"} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-green-600 text-sm">
                        <Check size={16} />
                        <span>In Stock and ready to ship</span>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <ProductReviews productId={product.id} />
        </div>
    );
};

export default ProductDetails;
