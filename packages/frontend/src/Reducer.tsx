import type { IState, Action } from "./types/types.tsx"

function reducer(state: IState, action: Action): IState {
    switch (action.type) {
        case "SET_SHOPS":
            return { ...state, shops: action.payload }
        case "SET_IS_LOADING":
            return { ...state, isLoading: action.payload }
        case "SET_PRODUCTS":
            return { ...state, products: action.payload }
        case "ADD_ITEM_TO_CART": {
            const isItemExist = state.cartItems.find(item => item.productId === action.payload.productId);

            if (isItemExist) {
                const updatedItems = state.cartItems.map(item =>
                    item.productId === action.payload.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return { ...state, cartItems: updatedItems };
            }

            return { ...state, cartItems: [...state.cartItems, action.payload] };
        }
        case 'CHANGE_CART_ITEM_QUANTITY': {
            return { ...state, cartItems: state.cartItems.map(item => item.productId === action.payload.productId ? action.payload : item) }

        }
        case "DELETE_ITEM_FROM_CART": {
            const newCartItems = state.cartItems.filter(item => item.productId !== action.payload.productId)
            return { ...state, cartItems: newCartItems }
        }
        case "CLEAR_ITEMS_IN_CART": {
            return { ...state, cartItems: [] }
        }
        case "SET_USER":
            console.log("SET_USER", action.payload)
            return { ...state, user: action.payload }
        case "SET_USER_ORDERS":
            console.log("SET_USER_ORDERS", action.payload)
            return { ...state, userOrders: action.payload }
        case "SET_ORDER":
            return { ...state, order: action.payload }
        default:
            return state
    }
}

export default reducer
