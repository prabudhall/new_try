import React, {createContext, useContext, useReducer} from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action)=>{
    switch(action.type){
        case "ADD":
            return [...state, {id:action.id, name:action.name, img:action.img, qty:action.qty, size:action.size, price:action.price, img:action.img}];
        case "REMOVE":
            let remnsv = [...state];
            remnsv.splice(action.index, 1);
            return remnsv;
        case "UPDATE":
            let arr = [...state];
            arr.find((food, index)=>{
                if(food.id === action.id){
                    arr[index] = {...food, qty: parseInt(action.qty) + parseInt(food.qty), price: parseInt(action.price) + food.price};
                }
            })
            return arr;
        case "DROP":
            let emptyArr = [];
            return emptyArr;
        default:
            console.log("Error in reducer");
    }
}

export const CartProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, []);
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider> 
    )
}

export const useCart = ()=>useContext(CartStateContext);
export const useDispatchCart = ()=>useContext(CartDispatchContext);
