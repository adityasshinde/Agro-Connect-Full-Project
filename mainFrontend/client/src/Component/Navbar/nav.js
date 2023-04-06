import React from "react";
import classes from './nav.module.css';
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from '../../store/ui-slice';
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

const Nav=(props)=>{
    const dispatch=useDispatch();
    const showCartHandler=()=>{
        dispatch(uiActions.Cart());
    dispatch(uiActions.setNavState(false));
    };

const token=useRouteLoaderData('root');
const hideNavHandler=()=>{
    dispatch(uiActions.setNavState(false));
};
const amount=100;
const purchaseHandler=(event)=>{
        console.log(event);
        props.purchaseTokens(amount);
}
   const message=useSelector(state=>state.chain.connectMessage);
    return<div className={classes.navbar}>
        {/* <div className={classes.navitem}>
            <img src={logo} alt="Loading"></img>
            <h2><NavLink to='/'>AGRO-connect</NavLink></h2>
        </div> */}
        <div className={classes.navitem}>
        <NavLink to='/'  className={({isActive})=>isActive ? classes.active : undefined}>Home</NavLink>
        <NavLink to={token ? 'farmer':'auth'} className={({isActive})=>isActive ? classes.active : undefined} onClick={hideNavHandler}>Sell Your Product</NavLink>
        </div>
        <div className={classes.navitem}>
        <NavLink to={token ? 'profile':'auth'} className={({isActive})=>isActive ? classes.active : undefined} onClick={hideNavHandler}>Profile</NavLink>
            <button onClick={showCartHandler}  className={({isActive})=>isActive ? classes.active : undefined}>Cart</button> 
            <button onClick={props.connectWallet}>{message}</button>
            {/* <button onClick={purchaseHandler}>Purchase</button> */}
            {token && <NavLink to='purchase' onClick={hideNavHandler}  className={({isActive})=>isActive ? classes.active : undefined}>PurchaseTokens</NavLink>}
            {!token && <NavLink to='/auth' onClick={hideNavHandler}>Login</NavLink>}
    { token && <Form action='/logout' method="post" onClick={hideNavHandler}><button>Logout</button></Form>}
        </div>
    </div>
};

export default Nav;