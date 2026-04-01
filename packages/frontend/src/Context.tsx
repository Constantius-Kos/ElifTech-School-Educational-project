import React, { createContext, useContext, useReducer, } from "react";
import type { IState, IContext } from "./types/types.tsx"
import reducer from "./Reducer.tsx"

const initialState: IState = {
    shops: [],
    isLoading: true,
    products: [],
    cartItems: [],
    order: null,
    user: null,
    userOrders: null

}






const Context = createContext<IContext | null>(null)

function ContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Context.Provider value={{ dispatch, ...state }}>
            {children}
        </Context.Provider>
    )
}
export function useAppContext(): IContext {
    const context = useContext(Context)
    if (!context) {
        throw new Error("useAppContext must be used within ContextProvider")
    }
    return context
}
export default ContextProvider
