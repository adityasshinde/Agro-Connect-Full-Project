import React from "react";
import classes from './PrevOrder.module.css';
const PrevOrder=(props)=>{
   return <div className={classes.main}>
          <h4>Total: {props.totalAmountPaid} AGC</h4>
          {props.orderedProducts.map(prod=>
          <li key={prod.OrderId} className={classes.item}>
            <span>Product Name: <span>{prod.name}</span></span>
            <span>OrderQunatity: <span>{prod.orderQuantity} kg</span></span>
            <span>Price: <span>{prod.price} AGC/kg</span></span>
            </li>)}
   </div>

};

export default PrevOrder;