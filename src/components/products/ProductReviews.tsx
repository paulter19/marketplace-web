import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Star, User } from 'lucide-react';
import { RootState } from '../../store';
import { addReview } from '../../store/slices/reviewsSlice';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';
import { showToast } from '../../store/slices/uiSlice';

interface ProductReviewsProps {
    productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
    const dispatch = useDispatch();
    const { reviews } = useSelector((state: RootState) => state.reviews);
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { orders } = useSelector((state: RootState) => state.orders);

    const [isWritingReview, setIsWritingReview] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const productReviews = reviews.filter(r => r.productId === productId);

    // Check if user has purchased this product
    const hasPurchased = orders.some(order =>
        order.userId === user?.id &&
        order.items.some(item => item.id === productId)
    );

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const newReview = {
            id: Date.now().toString(),
            productId,
            userId: user.id,
            userName: user.name,
            rating,
            comment,
            date: new Date().toISOString()
        };

        dispatch(addReview(newReview));
        dispatch(showToast({ message: 'Review submitted successfully', type: 'success' }));
        setIsWritingReview(false);
        setComment('');
        setRating(5);
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Customer Reviews</h2>

            {isAuthenticated && hasPurchased && !isWritingReview && (
                <div className="mb-8">
                    <Button onClick={() => setIsWritingReview(true)}>Write a Review</Button>
                </div>
            )}

            {isWritingReview && (
                <Card className="mb-8 bg-slate-50">
                    <form onSubmit={handleSubmitReview}>
                        <h3 className="text-lg font-bold mb-4">Write your review</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            size={24}
                                            fill={star <= rating ? "currentColor" : "none"}
                                            className={star <= rating ? "text-yellow-400" : "text-slate-300"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Comment</label>
                            <textarea
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                placeholder="Share your thoughts about this product..."
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit">Submit Review</Button>
                            <Button type="button" variant="secondary" onClick={() => setIsWritingReview(false)}>Cancel</Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="space-y-6">
                {productReviews.length === 0 ? (
                    <p className="text-slate-500">No reviews yet. Be the first to review this product!</p>
                ) : (
                    productReviews.map(review => (
                        <div key={review.id} className="border-b border-slate-200 pb-6 last:border-0">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                                    <User size={16} className="text-slate-500" />
                                </div>
                                <span className="font-medium text-slate-900">{review.userName}</span>
                                <span className="text-sm text-slate-500 ml-auto">{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex text-yellow-400 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < review.rating ? "currentColor" : "none"}
                                        className={i < review.rating ? "" : "text-slate-300"}
                                    />
                                ))}
                            </div>
                            <p className="text-slate-700">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductReviews;
