import React, { useState } from "react";
import Credential from "./Credential";
import classes from './Profile.module.css';
import { Link } from "react-router-dom";
import AvlProduct from "./avlProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "../../store/ui-slice";

const Profile=(props)=>{
       const metamask=localStorage.getItem('metamask');
    const username=localStorage.getItem('username');
    const dispatch=useDispatch();
    const [showList,setShowList]=useState(false);
    useEffect(()=>{
        fetchList();
    },[])
 const fetchList=async()=>{
        const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/availableProducts.json');
        if(!response.ok){
            throw new Error();
        };
        const data=await response.json();
        const currentList=[];
       for(const i in data){
           if(data[i].owner===username){
            currentList.push({
                 id:data[i].id,
                 name:data[i].name,
                 Quantity:data[i].amount,
                 price:data[i].price,
                 initialAmount:data[i].initialAmount,
                 expDate:data[i].expDate
            });
           }
       }
       dispatch(uiActions.setCurrentlyListed(currentList));
    };
    const setShowCurrentList=()=>{
        setShowList(state=>!state);
    }
    const currentList=useSelector(state=>state.ui.CurrentlyListed);
    const balance=useSelector(state=>state.ui.farmerBalance);
    return <div className={classes.main}>
        <div className={classes.cred}>
            <Credential username={username} metamask={metamask} balance={balance}></Credential>
            <div className={classes.button}>
           {!metamask && <Link to='metamask' className={classes.link}>Add Metamask</Link>}
            <Link to={metamask ?'addItem':'metamask'} className={classes.link}>Add Product</Link>
            </div>
        </div>
        <section className={classes.avl}>
            <button className={classes.link} onClick={setShowCurrentList}>{showList ? 'Hide':'See Currently listed Products'}</button>
            <Link to='/corner' className={classes.link}>Visit Farmer's Corner</Link>
          {showList && currentList.map(prod=><AvlProduct key={prod.id}
          name={prod.name} Quantity={prod.Quantity} price={prod.price} expDate={prod.expDate} initialAmount={prod.initialAmount}></AvlProduct>)} 
         </section>
    </div>
};

export default Profile;