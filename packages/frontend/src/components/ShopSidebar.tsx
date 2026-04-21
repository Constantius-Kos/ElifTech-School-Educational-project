import cl from './ShopSidebar.module.css';
// import { useState, useEffect } from 'react';
import imageMap from '../assets/images/index.js';
import { useState } from 'react';
import { useAppContext } from '../context/Context.tsx';
import type { IProductResponse } from '@shared/sharedTypes.js';
import { getProducts } from '../api/api';
import useActions from '../utils/useActions.ts';
import { useSearchParams } from 'react-router-dom';

function ShopSidebar() {
  const { setSelectedShopId, setProducts } = useActions();
  const { shops, selectedShopId } = useAppContext();
  const [ratingRange, setRatingRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 5,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  async function handleShopSelect(
    shopId: string,

  ) {
    setSelectedShopId(shopId);
    setSearchParams({ shopId });
    const res: IProductResponse = await getProducts({ shopId });
    console.log('handleShopSelect:', res);
    setProducts(res);
  }

  const filteredShops = shops.filter(
    (shop) => shop.rating >= ratingRange.min && shop.rating <= ratingRange.max
  );

  return (
    <div className={cl.ShopSideBar}>
      <div className={cl.SortPanel}>
        <button onClick={() => setRatingRange({ min: 0, max: 5 })}>All</button>
        <button onClick={() => setRatingRange({ min: 4, max: 5 })}>
          4.0 - 5.0
        </button>
        <button onClick={() => setRatingRange({ min: 3, max: 4 })}>
          3.0 - 4.0
        </button>
        <button onClick={() => setRatingRange({ min: 2, max: 3 })}>
          2.0 - 3.0
        </button>
        <button onClick={() => setRatingRange({ min: 1, max: 2 })}>
          1.0 - 2.0
        </button>
      </div>
      <div className={cl.SideBar}>
        {filteredShops.map((shop) => (
          <div
            key={shop._id}
            className={`${cl.Shop} ${selectedShopId === shop._id ? cl.SelectedShop : ''
              }`}
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
