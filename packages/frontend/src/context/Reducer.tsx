import type { IState, Action } from '../types/types.tsx';
import initialState from './initialState.ts';


function reducer(state: IState, action: Action): IState {
  switch (action.type) {
    case 'LOGOUT':
      return {
        ...initialState,
        shops: state.shops,
        coupons: state.coupons,
      };
    case 'SET_SHOPS':
      return { ...state, shops: action.payload };
    case 'SET_PRODUCTS':
      console.log("SET_PRODUCTS", action.payload.categories)
      return {
        ...state,
        products: action.payload.products,
        totalProducts: action.payload.totalCount,
        categories: action.payload.categories,
      };
    case 'ADD_PRODUCTS':
      console.log("ADD_PRODUCTS", action.payload.categories)
      return {
        ...state,
        products: [...state.products, ...action.payload.products],
        totalProducts: action.payload.totalCount,
        categories: action.payload.categories,
      };
    case 'ADD_ITEM_TO_CART': {
      const isItemExist = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );

      if (isItemExist) {
        const updatedItems = state.cartItems.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cartItems: updatedItems };
      }

      return { ...state, cartItems: [...state.cartItems, action.payload] };
    }
    case 'CHANGE_CART_ITEM_QUANTITY': {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId === action.payload.productId ? action.payload : item
        ),
      };
    }
    case 'DELETE_ITEM_FROM_CART': {
      const newCartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      );
      return { ...state, cartItems: newCartItems };
    }
    case 'CLEAR_ITEMS_IN_CART': {
      return { ...state, cartItems: [] };
    }
    case 'SET_USER_ORDERS':
      // console.log("SET_USER_ORDERS", action.payload)
      return { ...state, userOrders: action.payload };
    case 'SET_ORDER':
      return { ...state, order: action.payload };
    case 'SET_COUPONS':
      // console.log("SET_COUPONS", action.payload)
      return { ...state, coupons: action.payload };
    case 'SET_USER_COUPONS':
      return { ...state, userCoupons: action.payload };
    case 'SET_SELECTED_SHOP_ID':
      return { ...state, selectedShopId: action.payload };
    case 'SET_USER':
      // console.log("SET_USER", action.payload)
      return { ...state, user: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export default reducer;
