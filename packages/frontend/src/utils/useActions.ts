import { useAppContext } from '../Context';
import { type IProduct } from '../../../shared/sharedTypes';

export default function useActions() {
  const { dispatch } = useAppContext();

  function setSelectedShopId(id: string): void {
    dispatch({ type: 'SET_SELECTED_SHOP_ID', payload: id });
  }
  function setProducts(products: IProduct[]): void {
    dispatch({ type: 'SET_PRODUCTS', payload: products });
  }
  return { setSelectedShopId, setProducts };
}
