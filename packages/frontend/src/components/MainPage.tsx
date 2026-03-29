import { useState, useEffect } from 'react';
import cl from './Shop.module.css';
import ShopSidebar from './ShopSidebar';
import ProductGreed from './ProductGreed';
import ShoppingCart from './ShoppingCart';
import type { IShop, IProduct, IOrderItem } from '@shared/types';
import { getShops, getProducts } from '../api/api';
// import { useAppContext } from '../Context'
interface IMain {
    flag: string,
    setIsLoading: (isLoading: boolean) => void
}
function MainPage({ flag, setIsLoading }: IMain) {
    const [shops, setShops] = useState<IShop[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([])

    useEffect(() => {
        const fetchShops = async () => {
            setIsLoading(true)
            const shops = await getShops();
            setShops(shops);
            setIsLoading(false)
        };
        fetchShops();
    }, [setIsLoading]);

    function addOrderItem(orderItem: IOrderItem) {
        setOrderItems(prev => {
            const existingItem = prev.find(item => item.productId === orderItem.productId);
            if (existingItem) {
                return prev.map(item =>
                    item.productId === orderItem.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, orderItem];
        });
    }

    async function setProductsArr(shopID: string) {
        const products: IProduct[] = await getProducts(shopID);
        setProducts(products);
    }

    function updateOrderItem(quantity: number, orderItem: IOrderItem) {
        setOrderItems(prev => {
            const existingItem = prev.find(item => item.productId === orderItem.productId);
            if (existingItem) {
                return prev.map(item =>
                    item.productId === orderItem.productId
                        ? { ...item, quantity: quantity || 1 }
                        : item
                );
            }
            return [...prev, orderItem];
        });
    }

    function deleteOrderItem(orderItem: IOrderItem) {
        setOrderItems(prev => prev.filter(item => item.productId !== orderItem.productId));
    }

    return (
        <div className={cl.MainPage}>
            {flag === "shop" && shops.length && <>
                <ShopSidebar shops={shops} onShopSelect={setProductsArr} />  <ProductGreed products={products} addOrderItem={addOrderItem} key={products[0]?.shopId || 'empty'} />
            </>}
            {flag === "cart" && <>
                <ShoppingCart orderItems={orderItems} updateOrderItem={updateOrderItem} deleteOrderItem={deleteOrderItem} setOrderItems={setOrderItems} />
            </>}
        </div>
    );
}

export default MainPage;
