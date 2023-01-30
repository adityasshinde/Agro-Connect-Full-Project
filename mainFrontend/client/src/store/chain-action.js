import { useSelector } from "react-redux";
import AgroCoin from '../build/contracts/AgroCoin.json';
import CoinSale from '../build/contracts/CoinSale.json';
import Wallet from '../build/contracts/Wallet.json';
import {ethers} from 'ethers';
import emailjs from '@emailjs/browser';
import { uiActions } from "./ui-slice";


export const sendEmail=(emailData)=>{
  emailjs.send("agro-connect","template_s8rg10h",{
    receiver_name: emailData.name,
    message: emailData.message,
    receiver_email: emailData.email,
    },'ow5r5wmhk8wQdVzpt');
}

export const PurchaseTokensHandler=(amount)=>{
    const currentAccount=useSelector(state=>state.chain.currentAccount);
    
    return async ()=>{
        const purchaseTokens=async(amount)=>{
            console.log(amount);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const AgroCoinInstance = new ethers.Contract("0x6aAa4fCc1547bB43509912c2147052eb033Cd910",AgroCoin.abi,signer);
            const CoinSaleInstance = new ethers.Contract("0x7a0639e4a8fb0743415063352E0794d7FB27bAF3",CoinSale.abi,signer);
            const WalletInstance = new ethers.Contract("0xD6709815391Fde6429B8b3aD16FF990763ce8d2d",Wallet.abi,signer);
            let transaction =  await CoinSaleInstance.buyTokens(currentAccount,{from:currentAccount,value:amount});
            console.log(transaction);
           };
           try{
            await purchaseTokens(amount);
           }catch(error){}
    }
}
export const TransactionHandler=()=>{
    const orderPlace=useSelector(state=>state.cart.order);
    return async ()=>{
        const transferAmount = async()=>{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const AgroCoinInstance = new ethers.Contract("0x6aAa4fCc1547bB43509912c2147052eb033Cd910",AgroCoin.abi,signer);
            const CoinSaleInstance = new ethers.Contract("0x7a0639e4a8fb0743415063352E0794d7FB27bAF3",CoinSale.abi,signer);
            const WalletInstance = new ethers.Contract("0xD6709815391Fde6429B8b3aD16FF990763ce8d2d",Wallet.abi,signer);
            if(orderPlace){
              for(const i in orderPlace){
                console.log("Purchasing : "+orderPlace[i].farmerAddress+" "+orderPlace[i].transferAmount+" "+orderPlace[i].prodName);
                let transaction = await WalletInstance.sendToFarmer(orderPlace[i].farmerAddress,orderPlace[i].transferAmount,orderPlace[i].prodName);
                console.log(transaction);
              }
              
            }
           }
           try{
            await transferAmount();
           }catch(error){}
    }
}