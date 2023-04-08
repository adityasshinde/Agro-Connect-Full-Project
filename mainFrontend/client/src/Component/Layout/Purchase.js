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
     // const AgroCoinInstance = new ethers.Contract("0xA6AF28f444De37123ac37a0ba3a45DE873435745",AgroCoin.abi,signer);
      const CoinSaleInstance = new ethers.Contract("0xdD7BEf5F6Ee3644e4EbF86D3365b25704a3a9465",CoinSale.abi,signer);
     // const WalletInstance = new ethers.Contract("0xD9FF348662D3EDB415F61a31ca35c4E447FBE1c8",Wallet.abi,signer);
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