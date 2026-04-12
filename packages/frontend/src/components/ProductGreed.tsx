import cl from './ProductGreed.module.css';
import { useState } from 'react';
import { useAppContext } from '../Context.tsx';
import ProductCart from './ProductCard.tsx';
import { getProducts } from '../api/api.ts';
import type { IProductResponse } from '../../../shared/sharedTypes.js';
import useActions from '../utils/useActions.ts';

function ProductGreed() {
  const { products, selectedShopId, totalProducts } = useAppContext();
  const { setSelectedShopId, setProducts } = useActions();
  const [category, setCategory] = useState<string>('All');
  const [sortType, setSortType] = useState<string>('');
  const [p, setP] = useState<number>(1);
  console.log(selectedShopId);
  const categories = [...new Set(products.map((p) => p.category))];
  const count = Math.ceil(totalProducts / 6);
  const pages = Array.from({ length: count }, (_, i) => i + 1);
  //   console.log(pages);
  //   console.log(count);
  const productsArr = products.slice((p - 1) * 6, p * 6);

  const filteredProducts =
    category === 'All'
      ? productsArr
      : productsArr.filter((product) => product.category === category);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case 'name_asc':
        return a.name.localeCompare(b.name); // А -> Я
      case 'name_desc':
        return b.name.localeCompare(a.name); // Я -> А
      case 'price_asc':
        return a.price - b.price; // Дешевые -> Дорогие
      case 'price_desc':
        return b.price - a.price; // Дорогие -> Дешевые
      default:
        return 0; // Как в оригинале
    }
  });
  async function handlePagination(
    shopId: string,
    page?: number,
    limit?: number
  ) {
    setSelectedShopId(shopId);
    const res: IProductResponse = await getProducts({ shopId, page, limit });
    console.log('handlePagination:', res);
    setProducts(res, true);
  }
  if (!products.length) return null;

  return (
    <div className={cl.ProductGreed}>
      <div className={cl.ProductGreedHeader}>
        <div className={cl.SortName}>
          <button
            onClick={() =>
              setSortType((prev) =>
                prev === 'name_asc' ? 'name_desc' : 'name_asc'
              )
            }
          >
            {sortType === 'name_asc' ? 'Z-a' : 'A-z'}
          </button>
        </div>
        <div className={cl.CategorySort}>
          <button
            key={'All'}
            onClick={() => setCategory('All')}
            className={category === 'All' ? cl.ActiveButton : ''}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={category === cat ? cl.ActiveButton : ''}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={cl.SortPrice}>
          <button
            onClick={() =>
              setSortType((prev) =>
                prev === 'price_asc' ? 'price_desc' : 'price_asc'
              )
            }
          >
            {sortType === 'price_asc' ? 'Price ↓' : 'Price ↑'}
          </button>
        </div>
      </div>

      <div className={cl.ProductGreedBody}>
        <div className={cl.BodyHeader}>
          {pages.map((page) => (
            <div
              onClick={() => {
                setP(page);
                handlePagination(selectedShopId, page, 6);
              }}
              className={page === p ? cl.ActivePage : ''}
            >
              {page}
            </div>
          ))}
        </div>
        {sortedProducts.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}

        <div className={cl.BodyHeader}>
          {pages.map((page) => (
            <div
              onClick={() => setP(page)}
              className={page === p ? cl.ActivePage : ''}
            >
              {page}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGreed;
