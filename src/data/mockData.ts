import { Product, Order, Review } from '../types';

export const CATEGORIES = [
    "Electronics",
    "Computers",
    "Smart Home",
    "Home & Kitchen",
    "Fashion",
    "Books",
    "Gaming",
    "Sports",
    "Beauty",
    "Automotive",
    "Toys",
    "Other"
];

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        description: 'Industry-leading noise cancellation, exceptional sound quality, and crystal-clear hands-free calling.',
        price: 348.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
        rating: 4.8,
        reviews: 1250,
        stock: 45,
        isNew: true,
        sales: 1500,
        createdAt: '2023-01-15T00:00:00Z',
        options: {
            'Color': ['Black', 'Silver', 'Blue']
        }
    },
    {
        id: '2',
        name: 'MacBook Air 15-inch M2 Chip',
        description: 'Impossibly thin and incredibly fast. The 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.',
        price: 1299.00,
        category: 'Computers',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800',
        rating: 4.9,
        reviews: 850,
        stock: 20,
        sales: 800,
        createdAt: '2023-06-10T00:00:00Z',
        options: {
            'Color': ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
            'Memory': ['8GB', '16GB', '24GB'],
            'Storage': ['256GB', '512GB', '1TB']
        }
    },
    {
        id: '3',
        name: 'Samsung 55" Class QLED 4K Smart TV',
        description: 'Experience vivid color and contrast with QLED technology. Smart TV features included.',
        price: 697.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800',
        rating: 4.6,
        reviews: 430,
        stock: 15,
        isSale: true,
        discount: 15,
        sales: 300,
        createdAt: '2022-11-20T00:00:00Z'
    },
    {
        id: '4',
        name: 'PlayStation 5 Console',
        description: 'Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.',
        price: 499.99,
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800',
        rating: 4.9,
        reviews: 2100,
        stock: 5,
        sales: 5000,
        createdAt: '2020-11-12T00:00:00Z'
    },
    {
        id: '5',
        name: 'Dyson V15 Detect Cordless Vacuum',
        description: 'Laser reveals microscopic dust. Automatically adapts suction power. Scientific proof of a deep clean.',
        price: 749.99,
        category: 'Home & Kitchen',
        image: 'https://images.unsplash.com/photo-1558317374-a354d5f6d4da?auto=format&fit=crop&q=80&w=800',
        rating: 4.7,
        reviews: 620,
        stock: 30,
        sales: 450,
        createdAt: '2023-03-05T00:00:00Z'
    },
    {
        id: '6',
        name: 'Apple Watch Series 9',
        description: 'Smarter, brighter, and mightier. The most powerful chip in Apple Watch ever.',
        price: 399.00,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800',
        rating: 4.8,
        reviews: 940,
        stock: 60,
        isNew: true,
        sales: 1200,
        createdAt: '2023-09-22T00:00:00Z',
        options: {
            'Case Size': ['41mm', '45mm'],
            'Band Color': ['Midnight', 'Starlight', 'Silver', 'Pink', 'Red']
        }
    },
    {
        id: '7',
        name: 'Nespresso Vertuo Plus Coffee and Espresso Machine',
        description: 'Brew the perfect cup of coffee or espresso with a single touch.',
        price: 159.00,
        category: 'Home & Kitchen',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800',
        rating: 4.5,
        reviews: 1500,
        stock: 100,
        isSale: true,
        discount: 20,
        sales: 2000,
        createdAt: '2021-05-10T00:00:00Z',
        bulkDiscounts: [
            { quantity: 2, discountPercent: 5 },
            { quantity: 4, discountPercent: 10 }
        ]
    },
    {
        id: '8',
        name: 'Levi\'s Men\'s 501 Original Fit Jeans',
        description: 'The original blue jean since 1873. Straight leg, button fly.',
        price: 79.50,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1542272617-08f08630793c?auto=format&fit=crop&q=80&w=800',
        rating: 4.4,
        reviews: 3200,
        stock: 200,
        sales: 5000,
        createdAt: '2019-01-01T00:00:00Z',
        options: {
            'Size': ['30x30', '32x32', '34x32', '36x34'],
            'Color': ['Dark Wash', 'Light Wash', 'Black']
        },
        bulkDiscounts: [
            { quantity: 2, discountPercent: 15 }
        ]
    },
    {
        id: '9',
        name: 'Kindle Paperwhite (16 GB)',
        description: 'Now with a 6.8" display and adjustable warm light.',
        price: 149.99,
        category: 'Books',
        image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=800',
        rating: 4.8,
        reviews: 5600,
        stock: 80,
        sales: 3500,
        createdAt: '2021-10-27T00:00:00Z'
    },
    {
        id: '10',
        name: 'Echo Dot (5th Gen)',
        description: 'Our best sounding Echo Dot yet. Enjoy an improved audio experience compared to any previous Echo Dot.',
        price: 49.99,
        category: 'Smart Home',
        image: 'https://images.unsplash.com/photo-1543512214-318c77a072d8?auto=format&fit=crop&q=80&w=800',
        rating: 4.6,
        reviews: 8900,
        stock: 150,
        sales: 10000,
        createdAt: '2022-10-20T00:00:00Z',
        options: {
            'Color': ['Charcoal', 'Deep Sea Blue', 'Glacier White']
        },
        bulkDiscounts: [
            { quantity: 3, discountPercent: 20 }
        ]
    }
];

export const MOCK_REVIEWS = [
    {
        id: 'r1',
        productId: '1',
        userId: 'u2',
        userName: 'Jane Doe',
        rating: 5,
        comment: 'Absolutely amazing sound quality! The noise cancellation is top-notch.',
        date: '2023-11-01T10:00:00Z'
    },
    {
        id: 'r2',
        productId: '1',
        userId: 'u3',
        userName: 'John Smith',
        rating: 4,
        comment: 'Great headphones, but a bit pricey.',
        date: '2023-10-25T14:30:00Z'
    },
    {
        id: 'r3',
        productId: '8',
        userId: 'u4',
        userName: 'Mike Johnson',
        rating: 5,
        comment: 'Classic fit, never goes out of style.',
        date: '2023-09-15T09:15:00Z'
    }
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-12345',
        userId: 'user-1',
        items: [
            { ...MOCK_PRODUCTS[0], quantity: 1 },
            { ...MOCK_PRODUCTS[9], quantity: 2 }
        ],
        total: 447.98,
        status: 'delivered',
        date: '2023-10-15T10:30:00Z',
        shippingAddress: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001'
        }
    },
    {
        id: 'ORD-67890',
        userId: 'user-1',
        items: [
            { ...MOCK_PRODUCTS[4], quantity: 1 }
        ],
        total: 749.99,
        status: 'processing',
        date: '2023-11-20T14:15:00Z',
        shippingAddress: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001'
        }
    }
];
