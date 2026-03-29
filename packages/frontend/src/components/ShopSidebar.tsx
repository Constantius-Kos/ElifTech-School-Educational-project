import cl from './Shop.module.css';
// import { useState, useEffect } from 'react';
// import { getShops } from '../api/api.js';
import type { IShop } from '@shared/types.js';
import imageMap from '../assets/images/index.js';
import { useState } from 'react';
interface IShopSidebar {
    shops: IShop[]
    onShopSelect: (shopID: string) => void
}

function ShopSidebar({ shops, onShopSelect }: IShopSidebar) {
    const [selectedShop, setSelectedShop] = useState<string | null>(null);
    const [ratingRange, setRatingRange] = useState<{ min: number, max: number }>({ min: 0, max: 5 });
    function handleShopSelect(shopID: string) {
        setSelectedShop(shopID);
        onShopSelect(shopID);

    }
    const filteredShops = shops.filter((shop) => shop.rating >= ratingRange.min && shop.rating <= ratingRange.max);
    return (
        <div className={cl.ShopSideBar}>

            <div className={cl.SortPanel}>
                <button onClick={() => setRatingRange({ min: 0, max: 5 })}>All</button>
                <button onClick={() => setRatingRange({ min: 4, max: 5 })}>4.0 - 5.0</button>
                <button onClick={() => setRatingRange({ min: 3, max: 4 })}>3.0 - 4.0</button>
                <button onClick={() => setRatingRange({ min: 2, max: 3 })}>2.0 - 3.0</button>
                <button onClick={() => setRatingRange({ min: 1, max: 2 })}>1.0 - 2.0</button>
            </div>
            <div className={cl.SideBar}>
                {filteredShops.map((shop) => (
                    <div
                        key={shop._id}
                        className={`${cl.Shop} ${selectedShop === shop._id ? cl.SelectedShop : ''}`}
                        onClick={() => handleShopSelect(shop._id)}
                    >
                        <img src={imageMap[shop.img]} alt={shop.name} />
                        <div className={cl.ShopInfo}>
                            <h2>{shop.name}</h2>
                            <p>{shop.category}</p>
                            <p>{shop.rating}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopSidebar;
