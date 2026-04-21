import { useAppContext } from '../context/Context';
import { type IProductResponse } from '../../../shared/sharedTypes';

export default function useActions() {
  const { dispatch } = useAppContext();

  function setSelectedShopId(id: string): void {
    dispatch({ type: 'SET_SELECTED_SHOP_ID', payload: id });
  }

  
  function setProducts(
    params: IProductResponse,
    append: boolean = false
  ): void {
    if (append) {
      dispatch({ type: 'ADD_PRODUCTS', payload: params });
    } else {
      dispatch({ type: 'SET_PRODUCTS', payload: params });
    }
  }
  return { setSelectedShopId, setProducts };
}
