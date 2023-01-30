import Nav from "./Component/Navbar/nav";
import { Outlet } from "react-router-dom";
import AgroCoin from './build/contracts/AgroCoin.json';
// import CoinSale from './build/contracts/CoinSale.json';
import Wallet from './build/contracts/Wallet.json';
import {ethers} from 'ethers';
import { chainActions } from './store/chain-slice';
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { cartActions } from "./store/cart-slice";
import { uiActions } from "./store/ui-slice";
import { saveOrder } from "./store/products-action";
import { editData } from "./store/products-action";
import Footer from "./Component/UI/Footer";
import { sendEmail } from "./store/chain-action";


const Root=()=>{
  const dispatch=useDispatch();
  const finalSave=useSelector(state=>state.cart.finalSave);
  const editedId=useSelector(state=>state.cart.editedId);
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
       const AgroCoinInstance = new ethers.Contract("0x4f93735C00431326bD330fCC01ffd1b92DBa3574",AgroCoin.abi,signer);
      //  const CoinSaleInstance = new ethers.Contract("0x2618dD0bffe017B8Fb8611AefdD64fa30CefadcD",CoinSale.abi,signer);
      //  const WalletInstance = new ethers.Contract("0x590442Ee4C1f206f58E8E2f378B174b5E18BFCF4",Wallet.abi,signer);
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
    //    const AgroCoinInstance = new ethers.Contract("0x4f93735C00431326bD330fCC01ffd1b92DBa3574",AgroCoin.abi,signer);
    //    const CoinSaleInstance = new ethers.Contract("0x2618dD0bffe017B8Fb8611AefdD64fa30CefadcD",CoinSale.abi,signer);
    //    const WalletInstance = new ethers.Contract("0x590442Ee4C1f206f58E8E2f378B174b5E18BFCF4",Wallet.abi,signer);
    //    let transaction =  await CoinSaleInstance.buyTokens(currentAccount,{from:currentAccount,value:amount});
    //    console.log(transaction);
    //    window.alert("tokens purchased successful!!!");
    //   };
      const TransferAmount = async()=>{
        console.log('started')
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       const AgroCoinInstance = new ethers.Contract("0x4f93735C00431326bD330fCC01ffd1b92DBa3574",AgroCoin.abi,signer);
      //  const CoinSaleInstance = new ethers.Contract("0x2618dD0bffe017B8Fb8611AefdD64fa30CefadcD",CoinSale.abi,signer);
       const WalletInstance = new ethers.Contract("0x590442Ee4C1f206f58E8E2f378B174b5E18BFCF4",Wallet.abi,signer);
      
       if(orderPlace){
        //console.log('in loop')
         const n = orderPlace.length;
         let transaction = new Array(n); 
         for(const i in orderPlace){
            console.log("Purchasing : from "+orderPlace[i].farmerAddress+" amount "+orderPlace[i].transferAmount+" "+orderPlace[i].prodName);
            transaction[i] = await WalletInstance.sendToFarmer(orderPlace[i].farmerAddress,orderPlace[i].transferAmount,orderPlace[i].prodName,{gasLimit:1000000});
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
         dispatch(saveOrder(finalSave));
         dispatch(editData(editedId));
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


      return <>
       <Nav connectWallet={ConnectWallet}></Nav>
        <main><Outlet /></main>
        <Footer/>
      </>;
};

export default Root;