import type { IState } from '../types/types.tsx';

const initialState: IState = {
  shops: [],
  isLoading: true,
  products: [],
  cartItems: [],
  order: null,
  user: null,
  userOrders: null,
  coupons: [],
  userCoupons: [],
  selectedShopId: '',
  totalProducts: 0,
  categories: [],
};

export default initialState;
