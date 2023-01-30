import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from '../../images/farmer.jpg'
import classes from './Custumer-Profile.module.css';
import Cart from "../Cart/Cart";
import { useEffect } from "react";
import { useState } from "react";
import { uiActions } from "../../store/ui-slice";
import PrevOrder from "./PrevOrder";
import { cartActions } from "../../store/cart-slice";
// import AgroCoin from '../../build/contracts/AgroCoin.json';
// import {ethers} from 'ethers';

const CustumerProfile=()=>{
    const showCart=useSelector(state=>state.ui.showCart);
    const username=localStorage.getItem('username');
    const dispatch=useDispatch();
   const balance=useSelector(state=>state.cart.balance);
    const [showOrders,setShowOrders]=useState(false);
   // const currentAccount=useSelector(state=>state.chain.currentAccount);
    useEffect(()=>{
        fetchOrders();

        
    },[])
 const fetchOrders=async()=>{
        const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/Order.json');
        if(!response.ok){
            throw new Error();
        };
        const data=await response.json();
        const prevOrder=[];
       for(const i in data){
           if(data[i].OrderedBy===username){
            prevOrder.push({
                 id:Math.random() * 1000,
                orderedProducts:data[i].orderedProducts,
                totalAmountPaid:data[i].totalAmountPaid
            });
           }
       }
       dispatch(uiActions.setPrevOrders(prevOrder));
    };
    const setShowOrdersHandler=()=>{
        setShowOrders(state=>!state);
    }
    
    const prevOrder=useSelector(state=>state.ui.prevOrders)

    // const getTokenBalance =async()=>{
    //     console.log('enter');
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    //     const AgroCoinInstance = new ethers.Contract("0x4f93735C00431326bD330fCC01ffd1b92DBa3574",AgroCoin.abi,signer);
    //     const tokenBalance = await AgroCoinInstance.balanceOf(currentAccount);
    //     dispatch(cartActions.setBalance(+tokenBalance));
    //     console.log("your token balance is "+tokenBalance);
    // }
    return <div className={classes.main}>
        {showCart && <Cart></Cart>}
         <section className={classes.details}>
            <img src={dp} alt="Loading" />
            <div>
                <p>Username: <span className={classes.inf}>{username}</span></p>
                <p>Token Balance: <span className={classes.inf}>{balance}</span></p>
            </div>
         </section>
         <section className={classes.orders}>
            <button className={classes.button} onClick={setShowOrdersHandler}>{showOrders ? 'Hide Previous Order':'See Previous Order'}</button>
          {showOrders && prevOrder.map(order=><PrevOrder key={order.id} orderedProducts={order.orderedProducts} totalAmountPaid={order.totalAmountPaid}></PrevOrder>)} 
         </section>
    </div>
};

export default CustumerProfile;