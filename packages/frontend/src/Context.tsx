// import React, { createContext, useContext, useState } from "react";
// import type { IShop } from "@shared/types.js"


// interface IContext {
//     shops: IShop[]
//     setShops: (shops: IShop[]) => void
// }
// interface IState {
//     shops: IShop[]
//     setShops: (shops: IShop[]) => void
// }
// const initialState: IState = {
//     shops: [],
//     setShops: () => { }
// }


// const Context = createContext<IContext | null>(null)

// function ContextProvider({ children }: { children: React.ReactNode }) {
//     const [shops, setShops] = useState<IShop[]>([])
//     return (
//         <Context.Provider value={{ shops, setShops }}>
//             {children}
//         </Context.Provider>
//     )
// }
// export function useAppContext() {
//     const context = useContext(Context)
//     if (!context) {
//         throw new Error("useAppContext must be used within ContextProvider")
//     }
//     return context
// }
// export default ContextProvider
