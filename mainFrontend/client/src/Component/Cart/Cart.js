import React, { useState } from "react";
import Modal from '../UI/Modal';
import CartItem from "./CartItem";
import classes from './Cart.module.css';
import { useDispatch,useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { cartActions } from "../../store/cart-slice";

import { Link, useRouteLoaderData } from "react-router-dom";

const Cart=(props)=>{
    const dispatch=useDispatch();
    const token=useRouteLoaderData('root');
    const username=localStorage.getItem('username');
    const items=useSelector(state=>state.cart.items);
    const avlProducts=useSelector(state=>state.prod.Available_Products);
    const totalAmount=useSelector(state=>state.cart.totalAmount);
    const Loading=useSelector(state=>state.cart.Loading);
    const customerEmail=useSelector(state=>state.ui.userEmail);
    //const user=useSelector(state=>state.ui.user);
   const balance=useSelector(state=>state.cart.balance);
//    const balance=localStorage.getItem('balance');
    const [error,setError]=useState(false);
    const hideCartHandler=()=>{
        dispatch(uiActions.hideCart());
    };

    
   const onAddHandler=(item)=>{
    const plusOneAdd={
        id:item.id,
        name:item.name,
        farmer:item.farmer,
        metamask:item.metamask,
        email:item.email,
        price:item.price,
        amount:1
    };
     let index;
    for(const i in items){
        if(items[i].id===item.id){
            index=i;
        }
    }  
    for(const i in avlProducts){
        if(avlProducts[i].id===items[index].id){
           if(avlProducts[i].amount===items[index].amount){
               setError(true);
               return;
           }
        }
    }
    dispatch(cartActions.addItem(plusOneAdd));
   };
   const onRemoveHandler=(id)=>{
    dispatch(cartActions.removeItem(id));
    setError(false);
   };
   const cartItems=(<ul className={classes['cart-items']}>{items.map((item)=>(
      <CartItem
       key={item.id}
       name={item.name}
       farmer={item.farmer} 
       email={item.email}
       metamask={item.metamask}
       price={item.price} 
       amount={item.amount} 
       onAdd={onAddHandler.bind(null,item)} 
       onRemove={onRemoveHandler.bind(null,item.id)}  />
      )
 )}</ul>);

 const hasItems=totalAmount>0;
 const orderHandler=(event)=>{
    event.preventDefault();
    if(balance<totalAmount){
        setError(true);
        return;
    }
    const orderedItems=[];
    const saveItems=[];
    const editedId=[];
    for (const item in items){
       orderedItems.push({
        farmerAddress:items[item].metamask,
        prodName:items[item].name,
        transferAmount:items[item].amount*items[item].price
       });
       let orderStr='order';
       let result=orderStr.concat(items[item].id);
       saveItems.push({
          OrderId:result,
          name:items[item].name,
          farmer:items[item].farmer,
          email:items[item].email,
          orderQuantity:items[item].amount,
          price:items[item].price,
          paidAmount:items[item].amount*items[item].price
       });
       editedId.push({
        id:items[item].id,
        decreseAmt:+items[item].amount
    });
    }
    const finalSave={
        OrderedBy:username,
        orderedProducts:saveItems,
        totalAmountPaid:totalAmount,
        email:customerEmail
    };
   const confirmOrder=prompt("Enter 100 to confirm your order");
    if(confirmOrder==='100'){
    dispatch(cartActions.orderHandler(orderedItems));
    dispatch(cartActions.place(true));
    dispatch(cartActions.setFinalSave(finalSave));
    dispatch(cartActions.setEditedId(editedId));
    //  if(orderStatus===11){
    //     console.log("yes in status");
    //     console.log(finalSave);
    //     console.log(editedId);
  
    //     // dispatch(cartActions.clearCart);
    //  }
    // dispatch(cartActions.clearCart());
    }
    else{
        alert("Your order has NOT been placed,try again !!!");
    }
    
 };
 return <Modal onClick={hideCartHandler}>  
         {!Loading && <div>
            <p>Your Balance: <span className={classes.bal}>{balance} AGC</span></p>
     {error && <p className={classes.error}>**Amount Exceeded**</p>}
     {cartItems}
     <div className={classes.total}>
         <span>Total Amount</span>
         <span>{totalAmount} AGC</span>
     </div>
     <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={hideCartHandler}>Close</button>
       {hasItems && token && <button className={classes.button} onClick={orderHandler}>Order</button>}
       {hasItems && !token && <Link className={classes.button} to='auth'>Order</Link>}
     </div></div>}
     {Loading && <div>
        <h3>Order in Progress</h3>
        <p>Please wait......</p></div>}
 </Modal>
};

export default Cart;