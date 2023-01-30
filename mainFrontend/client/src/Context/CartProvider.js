import React,{ useReducer } from "react";
import CartContext from './CartContext';


const defaultState={
    items:[],
    totalAmount:0
};
const cartReducer=(state,action)=>{
    if(action.type==='ADD'){
       const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount;
       const existingItemIndex=state.items.findIndex(item=>
        item.id===action.item.id);
        const existingItem=state.items[existingItemIndex];
        let updatedItem;
        let updatedItems;
        if(existingItem){
            
            updatedItem={
                ...existingItem,
                amount:existingItem.amount+action.item.amount
            }

            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }else{
            updatedItems=state.items.concat(action.item);
        }
        
      return{
        items:updatedItems,
        totalAmount:updatedTotalAmount
      };
    }
 if(action.type==='REMOVE'){
 const deleteItemIndex=state.items.findIndex(item=>action.id===item.id);
 const deleteItem=state.items[deleteItemIndex];
 const updatedTotalAmount=state.totalAmount-deleteItem.price;
 let updatedItems;
 if(deleteItem.amount===1){
    updatedItems=state.items.filter(item=>item.id!==action.id);
 }
else{
    let updatedItem={
        ...deleteItem,
        amount:deleteItem.amount-1
     }
    updatedItems=[...state.items];
    updatedItems[deleteItemIndex]=updatedItem;
}
 return {
    items:updatedItems,
    totalAmount:updatedTotalAmount
 } 
}
    return defaultState;
};
const CartProvider=(props)=>{
const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultState);
const addItemToCartHandler=(item)=>{
    dispatchCartAction({type:'ADD',item:item});
};
const removerItemFromCartHandler=(id)=>{
    dispatchCartAction({type:'REMOVE',id:id});
};
const clearCartHandler=()=>{
    dispatchCartAction({type:'CLEAR'});
};
const cartContext={
    items:cartState.items,
    totalAmount:cartState.totalAmount,
    addItem:addItemToCartHandler,
    removeItem:removerItemFromCartHandler,
    clearCart:clearCartHandler
};
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;