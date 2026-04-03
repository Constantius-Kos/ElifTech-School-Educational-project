import cl from './ShopPage.module.css';
import imageMap from '../assets/images/index.js';
import { useState } from 'react';
import { useAppContext } from '../Context.tsx';

function ProductGreed() {
    const { products, dispatch } = useAppContext()
    const [category, setCategory] = useState<string>('All');
    const [sortType, setSortType] = useState<string>('')
    // console.log(products)
    const categories = [...new Set(products.map(p => p.category))];

    const filteredProducts = category === 'All' ? products : products.filter((product) => product.category === category);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortType) {
            case 'name_asc': return a.name.localeCompare(b.name);       // А -> Я
            case 'name_desc': return b.name.localeCompare(a.name);       // Я -> А
            case 'price_asc': return a.price - b.price;                  // Дешевые -> Дорогие
            case 'price_desc': return b.price - a.price;                 // Дорогие -> Дешевые
            default: return 0;                                           // Как в оригинале
        }
    });

    if (!products.length) return null;

    return <div className={cl.ProductGreed}>
        <div className={cl.ProductGreedHeader}>
            <div className={cl.SortName}>
                <button onClick={() => setSortType(prev => prev === 'name_asc' ? 'name_desc' : 'name_asc')}>
                    {sortType === 'name_asc' ? 'Z-a' : 'A-z'}
                </button>
            </div>
            <div className={cl.CategorySort}>
                <button key={'All'} onClick={() => setCategory('All')} className={category === 'All' ? cl.ActiveButton : ''}>All</button>
                {categories.map((cat) => (
                    <button key={cat} onClick={() => setCategory(cat)} className={category === cat ? cl.ActiveButton : ''}>{cat}</button>
                ))}
            </div>
            <div className={cl.SortPrice}>
                <button onClick={() => setSortType(prev => prev === 'price_asc' ? 'price_desc' : 'price_asc')}>
                    {sortType === 'price_asc' ? 'Price ↓' : 'Price ↑'}
                </button>
            </div>
        </div>
        <div className={cl.ProductGreedBody}>
            {sortedProducts.map((product) => (
                <div key={product._id} className={cl.Product}>
                    <img src={imageMap[product.img]} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price} UAH</p>
                    <button onClick={() => dispatch({ type: "ADD_ITEM_TO_CART", payload: { img: product.img, productId: product._id, name: product.name, price: product.price, quantity: 1 } })}>Add to cart</button>
                </div>
            ))}
        </div>
    </div>;
}

export default ProductGreed;
