import NavbarWrap from "./Component/Navbar/NavbarWrap";
import { Outlet } from "react-router-dom";
import AgroCoin from './build/contracts/AgroCoin.json';
// import CoinSale from './build/contracts/CoinSale.json';
import Wallet from './build/contracts/Wallet.json';
import GoldenBadge from './build/contracts/GoldenBadge.json'
import SilverBadge from './build/contracts/SilverBadge.json'
import BronzeBadge from './build/contracts/BronzeBadge.json'
import BadgeDelivery from './build/contracts/BadgeDelivery.json'
import {ethers} from 'ethers';
import { chainActions } from './store/chain-slice';
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cartActions } from "./store/cart-slice";
import { uiActions } from "./store/ui-slice";
import { saveOrder } from "./store/products-action";
import { editData } from "./store/products-action";
import Footer from "./Component/UI/Footer";
import { sendEmail } from "./store/chain-action";
import { saveOrderToIPFS } from "./store/products-action";
import { uploadJSONToPinata } from "./ipfs";


const Root=()=>{
  const dispatch=useDispatch();
  const finalSave=useSelector(state=>state.cart.finalSave);
  const editedId=useSelector(state=>state.cart.editedId);
  const holdingBronzeBadge=useSelector(state=>state.chain.holdingBronzeBadge)
  const holdingSilverBadge=useSelector(state=>state.chain.holdingSilverBadge)
  const holdingGoldBadge=useSelector(state=>state.chain.holdingGoldBadge)
  const totalPrevPurchase=useSelector(state=>state.chain.totalPrevPurchase)

  useEffect(()=>{
    getCurrentWalletConnected();
    addWalletListener();
    getContract();
    if(username){
      fetchFarmer(username);
      fetchUser(username);
    }
  });
  const username=localStorage.getItem('username')||null;
  const fetchUser= async(username)=>{
  const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/users.json');
  if(!response.ok){
      throw new Error();
  }
  const data=await response.json();
  for (const i in data) {
    if(data[i].username===username){
      dispatch(uiActions.setUserEmail(data[i].email));
    }
  }
}

  const fetchFarmer=async(username)=>{
    const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/farmers.json');
        if(!response.ok){
            throw new Error();
        };
        const data=await response.json();
        for(const i in data){
            if(data[i].username===username){
            localStorage.setItem('metamask',data[i].metamask);
            }
      }
   }

   
   const currentAccount=useSelector(state=>state.chain.currentAccount);
   const getContract =async ()=>{
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       const AgroCoinInstance = new ethers.Contract("0xA6AF28f444De37123ac37a0ba3a45DE873435745",AgroCoin.abi,signer);
       const GoldenBadgeInstance = new ethers.Contract("0x7B7D8A3B1e6289220fFd580843f77A7Df0177B8b",GoldenBadge.abi,signer);
       const SilverBadgeInstance = new ethers.Contract("0x926Bc057b07012Eeb1A22344b639c61c315485F8",SilverBadge.abi,signer);
       const BronzeBadgeInstance = new ethers.Contract("0xEe90eaAD23089693049F6ae0231aebd577AE2949",BronzeBadge.abi,signer);
       let goldBalance = await GoldenBadgeInstance.balanceOf(currentAccount);
       let silverBalance = await SilverBadgeInstance.balanceOf(currentAccount);
       let bronzeBalance = await BronzeBadgeInstance.balanceOf(currentAccount);
       console.log("goldBalance ",goldBalance.toNumber())
       console.log("silverBalance ",silverBalance.toNumber())
       console.log("bronzeBalance ",bronzeBalance.toNumber())
       if (goldBalance.toNumber()>0) {
        dispatch(chainActions.setHoldingGoldBadge(true))
       }
       if (silverBalance.toNumber()>0) {
        dispatch(chainActions.setHoldingSilverBadge(true))
       }
       if (bronzeBalance.toNumber()>0) {
        dispatch(chainActions.setHoldingBronzeBadge(true))
       }
      //  const CoinSaleInstance = new ethers.Contract("0xdD7BEf5F6Ee3644e4EbF86D3365b25704a3a9465",CoinSale.abi,signer);
      //  const WalletInstance = new ethers.Contract("0xD9FF348662D3EDB415F61a31ca35c4E447FBE1c8",Wallet.abi,signer);
       //console.log(provider,signer,AgroCoinInstance);
      //  let totalSupply = await AgroCoinInstance.totalSupply();
       //console.log("the total supply is "+ totalSupply);
       let currentLoggedin = localStorage.getItem('metamask');
       console.log(currentLoggedin);
      if(currentLoggedin){
        let balance = await AgroCoinInstance.getBalanceof(currentLoggedin);
        // console.log("the balance of selected account is "+balance);
         dispatch(uiActions.setFarmerBalance(+balance));
      }
       const tokenBalance = await AgroCoinInstance.balanceOf(currentAccount);
       console.log("required type "+ typeof(currentAccount))
      console.log("your token balance is "+tokenBalance);
      //  localStorage.setItem('balance',+tokenBalance);
      //  console.log(+tokenBalance);
      dispatch(cartActions.setBalance(+tokenBalance));
      // let availableTokens = await AgroCoinInstance.balanceOf("0x7a0639e4a8fb0743415063352E0794d7FB27bAF3");
       //console.log("available tokens to sell : "+availableTokens);
      // setShowBalance(tokenBalance);
     }
     const orderPlace=useSelector(state=>state.cart.order);
     const totalAmount=useSelector(state=>state.cart.totalAmount);
     const getCurrentWalletConnected = async()=>{

       if(typeof window!= "undefined" && typeof window.ethereum !="undefined") {
         try{
           
             const accounts = await window.ethereum.request({method: "eth_accounts"});
             if(accounts.length>0){
               // setConnectMessage('Connected');
               // setCurrentAccount(accounts[0]);
               dispatch(chainActions.setConnectMessage('Connected'));
               dispatch(chainActions.setCurrentAccount(accounts[0]));
               console.log(accounts[0]);
             }
             else{
               console.log("connect to metamask");
             }
     
         }
         catch(err){
             console.log(err);
         }
       }
       else{
         console.log("metamask is not installed!! please install metamask.")
       }
     }
     const addWalletListener = async()=>{
       if(typeof window!= "undefined" && typeof window.ethereum !="undefined") {
         window.ethereum.on("accountsChanged",(accounts)=>{
           //setCurrentAccount(accounts[0]);
           dispatch(chainActions.setCurrentAccount(accounts[0]));
           console.log({currentAccount});
         })
       
       }
       else{
         //setCurrentAccount("");
         dispatch(chainActions.setCurrentAccount(""));
         console.log("metamask is not installed!! please install metamask.")
       }
     }
    //  const PurchaseTokens=async(amount)=>{
    //    console.log(amount);
    //    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //    const signer = provider.getSigner();
    //    const AgroCoinInstance = new ethers.Contract("0xA6AF28f444De37123ac37a0ba3a45DE873435745",AgroCoin.abi,signer);
    //    const CoinSaleInstance = new ethers.Contract("0xdD7BEf5F6Ee3644e4EbF86D3365b25704a3a9465",CoinSale.abi,signer);
    //    const WalletInstance = new ethers.Contract("0xD9FF348662D3EDB415F61a31ca35c4E447FBE1c8",Wallet.abi,signer);
    //    let transaction =  await CoinSaleInstance.buyTokens(currentAccount,{from:currentAccount,value:amount});
    //    console.log(transaction);
    //    window.alert("tokens purchased successful!!!");
    //   };
      const TransferAmount = async()=>{
        console.log('started')
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       const AgroCoinInstance = new ethers.Contract("0xA6AF28f444De37123ac37a0ba3a45DE873435745",AgroCoin.abi,signer);
      //  const CoinSaleInstance = new ethers.Contract("0xdD7BEf5F6Ee3644e4EbF86D3365b25704a3a9465",CoinSale.abi,signer);
       const WalletInstance = new ethers.Contract("0xD9FF348662D3EDB415F61a31ca35c4E447FBE1c8",Wallet.abi,signer);
      
       if(orderPlace){
        //console.log('in loop')
        let newTotal=0;
         const n = orderPlace.length;
         let transaction = new Array(n); 
         for(const i in orderPlace){
            console.log("Purchasing : from "+orderPlace[i].farmerAddress+" amount "+orderPlace[i].transferAmount+" "+orderPlace[i].prodName);
            transaction[i] = await WalletInstance.sendToFarmer(orderPlace[i].farmerAddress,orderPlace[i].transferAmount,orderPlace[i].prodName,{gasLimit :1000000});
            newTotal+=orderPlace[i].transferAmount;
            console.log(transaction);
         }
         dispatch(cartActions.setLoading(true));
         for (let index = 0; index < n; index++) {
          await transaction[index].wait(); 
         }
         let tx =await AgroCoinInstance.burnToken(currentAccount,totalAmount);
         await tx.wait();
         dispatch(cartActions.setLoading(false));
         window.alert('order placed successfully!!!');
         console.log("NewTotal ",newTotal)
         const sum=totalPrevPurchase+newTotal;
         dispatch(chainActions.setTotalPrevPurchase(sum));
         console.log("New totalPrevPurchase ",totalPrevPurchase)
         console.log("New sum ",sum)
         if(sum>=1500 && !holdingBronzeBadge){
                  DeliverBronzeBadge();
                  console.log("DeliverBadge called")
         }
         if(sum>=3000 && !holdingSilverBadge){
                  DeliverSilverBadge();
                  console.log("DeliverBadge called")
         }
         if(sum>=5000 && !holdingGoldBadge){
                  DeliverGoldBadge();
                  console.log("DeliverBadge called")
         }
         dispatch(saveOrder(finalSave));
         dispatch(editData(editedId));
        //  const hash = await uploadJSONToPinata(finalSave);
        //  console.log(`JSON data uploaded to Pinata with hash: ${hash}`);

        // //  dispatch(saveOrderToIPFS(finalSave));
        //  //const data = await getJSONFromPinata(hash);
        //  console.log("after ipfs");
        //  dispatch(saveOrderToIPFS(finalSave));
         for (const key in finalSave.orderedProducts){
          const emailData={
            name:finalSave.orderedProducts[key].farmer,
            email:finalSave.orderedProducts[key].email,
            message:`You have a new order of ${finalSave.orderedProducts[key].orderQuantity}kg ${finalSave.orderedProducts[key].name} from ${finalSave.OrderedBy} \n
            Total Amount Paid: ${finalSave.orderedProducts[key].paidAmount} AGC`
          }
          console.log(emailData);
          sendEmail(emailData);
         }
         const emailData={
          name:finalSave.OrderedBy,
          email:finalSave.email,
          message:'Your Order has been placed successfully !!!'
         }
         console.log(emailData);
         sendEmail(emailData);
         dispatch(cartActions.clearCart());
         dispatch(cartActions.place(false));
        //  let farmerbalance= await AgroCoinInstance.getBalanceof('0x0A0CE8f32483046bEF139c4206a65E095C1C2C2D');
        //  console.log('farmers balance is now : '+ farmerbalance);

         // dispatch(cartActions.clearCart());

       }
      }
      const status=useSelector(state=>state.cart.placed);
      console.log(status);
      if(status){
        TransferAmount();
        console.log('transferamount called')
      }
 const ConnectWallet = async()=>{
     if(typeof window!= "undefined" && typeof window.ethereum !="undefined") {
       try{
           //metamask is already installed!
           const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
           dispatch(chainActions.setConnectMessage('Connected'));
           dispatch(chainActions.setCurrentAccount(accounts[0]));
           console.log(accounts[0]);
          
       }
       catch(err){
           console.log(err);
       }
     }
     else{
       console.log("metamask is not installed!! please install metamask.")
     }
     }

     const DeliverBronzeBadge =async ()=>{
        console.log("entered deliverbadge function");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const BadgeDeliveryInstance = new ethers.Contract("0x604Be4B3441732167C35C652c855a15B460B185C",BadgeDelivery.abi,signer);
        let deliverBadge = await BadgeDeliveryInstance.deliverBronzeBadge("0xEe90eaAD23089693049F6ae0231aebd577AE2949",{from:currentAccount});
        await deliverBadge.wait();
        alert("You received a new Bronze Badge");
      }
      const DeliverGoldBadge =async ()=>{
        //console.log("entered deliverbadge function");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const BadgeDeliveryInstance = new ethers.Contract("0x604Be4B3441732167C35C652c855a15B460B185C",BadgeDelivery.abi,signer);
        let deliverBadge = await BadgeDeliveryInstance.deliverGoldenBadge("0x7B7D8A3B1e6289220fFd580843f77A7Df0177B8b",{from:currentAccount});
        await deliverBadge.wait();
        alert("You received a new Gold Badge");
      }
      const DeliverSilverBadge =async ()=>{
       // console.log("entered deliverbadge function");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const BadgeDeliveryInstance = new ethers.Contract("0x604Be4B3441732167C35C652c855a15B460B185C",BadgeDelivery.abi,signer);
        let deliverBadge = await BadgeDeliveryInstance.deliverSilverBadge("0x926Bc057b07012Eeb1A22344b639c61c315485F8",{from:currentAccount});
        await deliverBadge.wait();
        alert("You received a new Silver Badge");
      }

      return <>
       <NavbarWrap connectWallet={ConnectWallet}></NavbarWrap>
        <main><Outlet /></main>
        <Footer/>
      </>;
};

export default Root;