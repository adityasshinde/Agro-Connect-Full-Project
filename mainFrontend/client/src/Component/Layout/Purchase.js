import React, { useState } from "react";
import { Form } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import classes from './Purchase.module.css';
//import AgroCoin from '../../build/contracts/AgroCoin.json';
import CoinSale from '../../build/contracts/CoinSale.json';
//import Wallet from '../../build/contracts/Wallet.json';
import {ethers} from 'ethers';
import { useSelector } from "react-redux";
const Purchase=()=>{
    const navigation=useNavigation();
    const [amount,setAmount]=useState();
    const [load,setLoad]=useState(false);
    const isSubmitting=navigation.state==='submitting';
    const PurchaseTokens=async(amount)=>{
      console.log(amount);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
     // const AgroCoinInstance = new ethers.Contract("0x4f93735C00431326bD330fCC01ffd1b92DBa3574",AgroCoin.abi,signer);
      const CoinSaleInstance = new ethers.Contract("0x2618dD0bffe017B8Fb8611AefdD64fa30CefadcD",CoinSale.abi,signer);
     // const WalletInstance = new ethers.Contract("0x590442Ee4C1f206f58E8E2f378B174b5E18BFCF4",Wallet.abi,signer);
      let transaction =  await CoinSaleInstance.buyTokens(currentAccount,{from:currentAccount,value:amount});
      setLoad(true);
      await transaction.wait();
      console.log(transaction);
      setLoad(false);
      window.alert("tokens purchased successful!!!");
     };
   const currentAccount=useSelector(state=>state.chain.currentAccount);
   const amountChangeHandler=(event)=>{
       setAmount(event.target.value);
   }
   const PurchaseHandler=(event)=>{
          event.preventDefault();
          PurchaseTokens(amount);
   }
    return <div className={classes.main}>
   <Form method="post" className={classes.form}>
        <h3>Purchase Tokens</h3>
        <p>
          <label htmlFor="amount">Amount</label>
          <input id="amount" type='number' name="amount" placeholder='Enter the amount' min='1' onChange={amountChangeHandler} required />
        </p>
        <div className={classes.actions}>
          <button disabled={isSubmitting} onClick={PurchaseHandler}>{(isSubmitting || load) ? 'Purchasing please wait...':'Purchase'}</button>
        </div>
      </Form>
    </div>
}

export default Purchase;