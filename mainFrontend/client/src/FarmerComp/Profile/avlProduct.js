import React from "react";
import classes from './avlProduct.module.css';
const AvlProduct=(props)=>{
   return <div className={classes.main}>
          <li className={classes.item}>
           <span>Product Name: <span>{props.name}</span></span>
           <span>Quantity Listed:<span>{props.initialAmount}kg</span></span>
           <span>Available: <span>{props.Quantity}kg</span></span>
           <span>Price:<span>{props.price} AGC/kg</span></span>
           <span>Expiry Date:<span>{props.expDate}</span></span>
          </li>
   </div>

};

export default AvlProduct;