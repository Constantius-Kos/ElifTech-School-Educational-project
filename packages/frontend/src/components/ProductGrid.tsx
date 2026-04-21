import cl from './ProductGrid.module.css';
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/Context.tsx';
import ProductCart from './ProductCard.tsx';
import { getProducts } from '../api/api.ts';
import type { IProductResponse } from '../../../shared/sharedTypes.js';
import useActions from '../utils/useActions.ts';
import { useSearchParams } from 'react-router-dom';

function ProductGrid() {
  const { products, selectedShopId, totalProducts, categories } = useAppContext();
  console.log('products:', products);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSelectedShopId, setProducts } = useActions();
  const [category, setCategory] = useState<string>('All');
  const p = Number(searchParams.get('page')) || 1;
  const [sortType, setSortType] = useState<string>('');
  const [append, setAppend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const observerTarget = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // console.log(selectedShopId);
  // const categories = [...new Set(products.map((p) => p.category))];
  const count = Math.ceil(totalProducts / 6);
  const pages = Array.from({ length: count }, (_, i) => i + 1);

  const productsArr = products;
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
        return a.price - b.price; // Дешеві -> Дорогі
      case 'price_desc':
        return b.price - a.price; // Дорогі -> Дешеві
      default:
        return 0; // Як в оригіналі
    }
  });
  async function handlePagination(
    shopId: string,
    page?: number,
    limit?: number
  ): Promise<void> {
    // setSelectedShopId(shopId);

    const res: IProductResponse = await getProducts({ shopId, page, limit });
    console.log('handlePagination:', res);
    setProducts(res, append);
  }
  const updatePage = (newPage: number): void => {
    // 1. створюємо копію поточних параметрів
    const params = new URLSearchParams(searchParams);

    // 2. встановлюємо або оновлюємо потрібний параметр
    params.set('page', newPage.toString());

    // 3. зберігаємо назад — інші параметри (наприклад, shopId) не постраждають
    setSearchParams(params);
  };
  const togglePaginationMode = () => {
    const newAppendMode = !append;
    setAppend(newAppendMode);

    // Якщо ми ВИКЛЮЧАЄМО нескінченний скрол — скидаємо список до 1-ї сторінки
    if (!newAppendMode) {
      handlePagination(selectedShopId, p, 6);
    }
  };
  // при оновленні сторінки робить запрос на сервер з параметрами з URL
  useEffect(() => {
    const shopIdFromUrl = searchParams.get('shopId');
    const pageFromUrl = Number(searchParams.get('page')) || 1;

    if (shopIdFromUrl) {
      setSelectedShopId(shopIdFromUrl);

      handlePagination(shopIdFromUrl, pageFromUrl, 6);
    }
  }, [append]);

  //Додаємо обсервер для дінамічного завантаження
  useEffect(() => {
    // 1. Создаем самого наблюдателя
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          const nextPage = p + 1;
          if (nextPage <= count) {
            setIsLoading(true);

            await handlePagination(selectedShopId, nextPage, 6);
            updatePage(nextPage);
            setIsLoading(false);

          }
        }


      },
      { root: scrollContainerRef.current } // Спрацює, коли маячок повністю покажеться
    );

    // 2. Говоримо спостерігачу, за яким елементом стежити
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    // 3. Обов'язково: Відключаємо спостерігача при уході зі сторінки
    return () => observer.disconnect();
  }, [append, isLoading, p, count, selectedShopId]);


  useEffect(() => {

  })

  if (!products.length) return <div>*****************</div>;
  // console.log(sortedProducts);
  return (
    <div className={cl.ProductGrid}>
      <div className={cl.ProductGridHeader}>
        <div className={cl.SortName}>
          <button onClick={() => togglePaginationMode()}>{append ? 'Scroll' : 'Pages'}</button>

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

      <div className={cl.ProductGridBody} ref={scrollContainerRef}>
        {!append && (
          <div className={cl.BodyHeader}>
            {pages.map((page) => (
              <div
                onClick={() => {
                  updatePage(page);
                  handlePagination(selectedShopId, page, 6);
                }}
                className={page === p ? cl.ActivePage : ''}
              >
                {page}
              </div>
            ))}
          </div>
        )}
        {sortedProducts.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}
        {append && <div ref={observerTarget} className={cl.ObserverTarget}>{isLoading && (
          <div className={cl.Loader}>
            <div className={cl.Spinner}></div>
          </div>
        )}</div>}
        {!append && (
          <div className={cl.BodyHeader}>
            {pages.map((page) => (
              <div
                onClick={() => updatePage(page)}
                className={page === p ? cl.ActivePage : ''}
              >
                {page}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductGrid;
