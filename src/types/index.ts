export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    reviews: number;
    stock: number;
    isNew?: boolean;
    isSale?: boolean;
    discount?: number;
    isActive?: boolean;
    sales?: number;
    createdAt?: string;
    options?: { [key: string]: string[] };
    bulkDiscounts?: { quantity: number; discountPercent: number }[];
}

export interface CartItem extends Product {
    quantity: number;
    selectedOptions?: { [key: string]: string };
}

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
    date: string;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest';
