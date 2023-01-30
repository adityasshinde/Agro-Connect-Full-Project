import React from "react";
import Modal from "../UI/Modal";
import classes from './Description.module.css';
import { useSelector } from "react-redux";

const Description=(props)=>{
    const availableProducts=useSelector(state=>state.prod.Available_Products);
    let reqProduct;
    for (const key in availableProducts){
        if(props.id===availableProducts[key].id){
          reqProduct={
            id:availableProducts[key].id,
            img:availableProducts[key].img,
            name:availableProducts[key].name,
            quantity:availableProducts[key].amount,
            price:availableProducts[key].price,
            farmer:availableProducts[key].owner,
            description:availableProducts[key].description,
            address:availableProducts[key].address,
            expDate:availableProducts[key].expDate
          }
        };
    }

    return <Modal onClick={props.hideDesc}>
      <div className={classes.header}>
      <img src={reqProduct.img} alt="Loading" className={classes.img}></img>
        <p className={classes.name}>{reqProduct.name}</p>
      </div>
      <div className={classes.container}>
      <p className={classes.inf}>Name:<span className={classes.itemInf}> {reqProduct.name}</span></p>
        <p className={classes.inf}>Farmer: <span className={classes.itemInf}>{reqProduct.farmer}</span></p>
        <p className={classes.inf}>Product Address: <span className={classes.itemInf}>{reqProduct.address}</span></p>
        <p className={classes.inf}>Description:<span className={classes.itemInf}> {reqProduct.description}</span></p>
        <p className={classes.inf}>Price:<span className={classes.itemInf}> {reqProduct.price} AGC/kg</span></p>
        <p className={classes.inf}>Availability:<span className={classes.itemInf}> {reqProduct.quantity} KG</span></p>
        <p className={classes.inf}>Expiry Date:<span className={classes.itemInf}> {reqProduct.expDate}</span></p>
      </div>
    </Modal>
};

export default Description;