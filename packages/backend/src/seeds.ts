import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Shop from './Models/Shop.js';
import Product from './Models/Product.js';

dotenv.config();

const DATA = [
    // --- ЕДА ---
    {
        shop: { name: 'McDonny', img: 'McDonny', rating: 4.7, category: 'Food' },
        products: [
            { name: 'Big Burger', description: 'Double beef', price: 150, img: 'Burger', category: 'Burgers' },
            { name: 'Chicken Burger', description: 'Crispy chicken', price: 120, img: 'ChickenBurger', category: 'Burgers' },
            { name: 'Cola', description: 'Cold drink', price: 30, img: 'Cola', category: 'Drinks' },
            { name: 'Milkshake', description: 'Vanilla', price: 50, img: 'Milkshake', category: 'Drinks' },
            { name: 'French Fries', description: 'Crispy', price: 50, img: 'Fries', category: 'Snacks' },
            { name: 'Chicken Nuggets', description: '6 pieces', price: 90, img: 'Nuggets', category: 'Snacks' },
            { name: 'Ice Cream', description: 'Vanilla', price: 40, img: 'IceCream', category: 'Desserts' },
            { name: 'Apple Pie', description: 'Warm and crispy', price: 45, img: 'ApplePie', category: 'Desserts' }
        ]
    },
    {
        shop: { name: 'Sushi Star', img: 'SushiStar', rating: 3.8, category: 'Food' },
        products: [
            { name: 'Salmon Roll', description: 'Fresh salmon', price: 200, img: 'Salmon', category: 'Rolls' },
            { name: 'California Roll', description: 'Crab and avocado', price: 180, img: 'California', category: 'Rolls' },
            { name: 'Miso Soup', description: 'Classic soup', price: 80, img: 'Soup', category: 'Soups' },
            { name: 'Ramen', description: 'Pork broth', price: 150, img: 'Ramen', category: 'Soups' },
            { name: 'Green Tea', description: 'Hot tea', price: 20, img: 'Tea', category: 'Drinks' },
            { name: 'Sake', description: 'Premium', price: 120, img: 'Sake', category: 'Drinks' }
        ]
    },
    // --- ТЕХНИКА ---
    {
        shop: { name: 'Gadget World', img: 'Gadget', rating: 3.3, category: 'Tech' },
        products: [
            { name: 'iPhone 15', description: 'Latest model', price: 1200, img: 'iPhone', category: 'Phones' },
            { name: 'Samsung S24', description: 'Flagship', price: 1100, img: 'Samsung', category: 'Phones' },
            { name: 'MacBook Air', description: 'M2 Chip', price: 1500, img: 'MacBook', category: 'Laptops' },
            { name: 'iPad Pro', description: '12.9 inch', price: 1100, img: 'iPad', category: 'Laptops' },
            { name: 'AirPods Pro', description: 'Noise cancelling', price: 250, img: 'AirPods', category: 'Accessories' },
            { name: 'Apple Watch', description: 'Series 9', price: 400, img: 'Watch', category: 'Accessories' }
        ]
    },
    {
        shop: { name: 'Pixel Play', img: 'Pixel', rating: 1.8, category: 'Tech' },
        products: [
            { name: 'PS5 Console', description: 'Gaming beast', price: 500, img: 'PS5', category: 'Consoles' },
            { name: 'Xbox Series X', description: 'Raw power', price: 500, img: 'Xbox', category: 'Consoles' },
            { name: 'Pokemon', description: 'Exclusive game', price: 60, img: 'Pokemon', category: 'Games' },
            { name: 'God of War', description: 'Epic adventure', price: 50, img: 'GoW', category: 'Games' },
            { name: 'DualSense', description: 'Wireless controller', price: 70, img: 'Controller', category: 'Accessories' },
            { name: 'Gaming Headset', description: '3D Audio', price: 100, img: 'Headset', category: 'Accessories' }
        ]
    },
    // --- ОДЕЖДА ---
    {
        shop: { name: 'Urban Style', img: 'Urban', rating: 2.7, category: 'Clothes' },
        products: [
            { name: 'Hoodie', description: 'Cotton black', price: 80, img: 'Hoodie', category: 'Tops' },
            { name: 'T-Shirt', description: 'Graphic print', price: 30, img: 'Tshirt', category: 'Tops' },
            { name: 'Cargo Pants', description: 'Loose fit', price: 70, img: 'Cargo', category: 'Bottoms' },
            { name: 'Joggers', description: 'Sport grey', price: 55, img: 'Joggers', category: 'Bottoms' },
            { name: 'Beanie', description: 'Winter hat', price: 20, img: 'Beanie', category: 'Accessories' },
            { name: 'Socks Pack', description: '3 pairs', price: 15, img: 'Socks', category: 'Accessories' }
        ]
    },
    {
        shop: { name: 'Elegant Look', img: 'Elegant', rating: 4.2, category: 'Clothes' },
        products: [
            { name: 'Formal Shirt', description: 'White slim', price: 90, img: 'Shirt', category: 'Shirts' },
            { name: 'Oxford Shirt', description: 'Classic blue', price: 85, img: 'Oxford', category: 'Shirts' },
            { name: 'Trousers', description: 'Classic fit', price: 120, img: 'Trousers', category: 'Pants' },
            { name: 'Chinos', description: 'Beige', price: 95, img: 'Chinos', category: 'Pants' },
            { name: 'Silk Tie', description: 'Blue', price: 40, img: 'Tie', category: 'Accessories' },
            { name: 'Leather Belt', description: 'Black', price: 55, img: 'Belt', category: 'Accessories' }
        ]
    }
];


async function seed() {
    try {
        await mongoose.connect(process.env.DEV_MONGO_URI!);
        console.log('Connected to DB...');

        await Shop.deleteMany({});
        await Product.deleteMany({});

        for (const item of DATA) {
            // 1. Создаем магазин
            const shop = await Shop.create(item.shop);
            console.log(`Created shop: ${shop.name}`);

            // 2. Берем уникальные товары ЭТОГО магазина и вставляем их для него
            const productsWithId = item.products.map(p => ({ ...p, shopId: shop._id }));
            await Product.insertMany(productsWithId);
            console.log(`  - Added ${item.products.length} unique products for ${shop.name}`);
        }

        console.log('Success! 🌱');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
