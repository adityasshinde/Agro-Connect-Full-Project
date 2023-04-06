import React from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import classes from './Summary.module.css';
import { uiActions } from "../../store/ui-slice";
import { chainActions } from "../../store/chain-slice";
import { useDispatch, useSelector } from "react-redux";

const Summary=(props)=>{
const token=useRouteLoaderData('root');
const dispatch=useDispatch();
const hideNavHandler=()=>{
    dispatch(uiActions.setNavState(false));
};
const message=useSelector(state=>state.chain.connectMessage);
const ConnectWallet = async()=>{
    if(typeof window!= "undefined" && typeof window.ethereum !="undefined") {
      try{
          //metamask is already installed!
          const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
          dispatch(chainActions.setConnectMessage('Connected'));
          dispatch(chainActions.setCurrentAccount(accounts[0]));
          dispatch(chainActions.setConnectWallet(true))
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

    return <div className={classes.main}>
        {/* <span className={classes.head}>Agro-Connect</span>
        <span className={classes.span}>Sowing seeds for sustainable tomorrow.....!!</span> */}
        {/* {!token && <Link className={classes.button} to='/auth'>Login</Link>} */}
      {message=="Connect" && <button onClick={ConnectWallet} className={classes.connectButton}>Connect Wallet</button>}
      {!token && <NavLink to='/auth' onClick={hideNavHandler} className={classes.login}>Login</NavLink>}
      
    </div>
};


export default Summary;