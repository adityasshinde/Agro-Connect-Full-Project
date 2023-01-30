import React from "react";
import classes from './nav.module.css';
import logo from '../../images/logo1.png';
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from '../../store/ui-slice';
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

const Nav=(props)=>{
    const dispatch=useDispatch();
    const showCartHandler=()=>{
        dispatch(uiActions.Cart());
    };

const token=useRouteLoaderData('root');

const amount=100;
const purchaseHandler=(event)=>{
        console.log(event);
        props.purchaseTokens(amount);
}
   const message=useSelector(state=>state.chain.connectMessage);
    return<div className={classes.navbar}>
        <div className={classes.navitem}>
            <img src={logo} alt="Loading"></img>
            <h2><NavLink to='/'>AGRO-connect</NavLink></h2>
        </div>
        <div className={classes.navitem}>
     <NavLink to={token ? 'farmer':'auth'} className={({isActive})=>isActive ? classes.active : undefined}>Sell Your Product</NavLink>
        </div>
        <div className={classes.navitem}>
        <NavLink to={token ? 'profile':'auth'} className={({isActive})=>isActive ? classes.active : undefined}>Profile</NavLink>
            <button onClick={showCartHandler}>Cart</button> 
            <button onClick={props.connectWallet}>{message}</button>
            {/* <button onClick={purchaseHandler}>Purchase</button> */}
            {token && <NavLink to='purchase'>PurchaseTokens</NavLink>}
            {!token && <NavLink to='/auth'>Login</NavLink>}
    { token && <Form action='/logout' method="post"><button>Logout</button></Form>}
        </div>
    </div>
};

export default Nav;