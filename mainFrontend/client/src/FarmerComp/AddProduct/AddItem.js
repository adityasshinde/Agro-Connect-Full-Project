import React, { useState } from "react";
import classes from './AddItem.module.css';
import Modal from "../../Component/UI/Modal";
import { Link } from "react-router-dom";
import { saveProduct } from "../../store/products-action";
import { useDispatch, useSelector } from "react-redux";

const AddItem= (props)=>{
    const dispatch=useDispatch();
    const metamask=localStorage.getItem('metamask');
    const farmer=localStorage.getItem('username');
    const [Error,setError]=useState();
    const [enteredId,setEnteredId]=useState('');
    const [enteredName,setEnteredName]=useState('');
    const [enteredAddress,setEnteredAddress]=useState('');
    const [enteredDesc,setEnteredDesc]=useState('');
    const [enteredPrice,setEnteredPrice]=useState('');
    const [enteredQuantity,setEnteredQuantity]=useState('');
    const [enteredImgL,setEnteredImgL]=useState('');
    const [enteredExpDate,setEnteredExpDate]=useState('');
    const email=useSelector(state=>state.ui.userEmail);

    const idChangeHandler=(event)=>{
        setEnteredId(event.target.value);
    };
    const nameChangeHandler=(event)=>{
        setEnteredName(event.target.value);
    };
    const descChangeHandler=(event)=>{
        setEnteredDesc(event.target.value);
    };
    const priceChangeHandler=(event)=>{
        setEnteredPrice(event.target.value);
    };
    const quanChangeHandler=(event)=>{
        setEnteredQuantity(event.target.value);
    };
    const imgLChangeHandler=(event)=>{
        setEnteredImgL(event.target.value);
    };
    const addrChangeHandler=(event)=>{
        setEnteredAddress(event.target.value);
    };
    const expDateChangeHandler=(event)=>{
        setEnteredExpDate(event.target.value);
    };
    
 
  const submitHandler=(event)=>{
     event.preventDefault();
     const exp=new Date(enteredExpDate);
     let expYear=exp.getFullYear();
     let expMonth = exp.getMonth();
     let expDay = exp.getDay();
     const date=new Date();
     let year = date.getFullYear();
     let month = date.getMonth();
     let day = date.getDay();
     if(enteredAddress.trim().length===0 ||enteredId.trim().length===0 || enteredName.trim().length===0 || enteredPrice.trim().length<2 || enteredQuantity.trim().length<0){
        setError({
            title:"Invalid Inputs",
            message:'Please enter valid inputs'
        })
        return;
     }
     if(year>expYear || (year===expYear && expMonth<month) || (year===expYear && month===expMonth && expDay-day<8)){
        setError({
            title:"Invalid Expiry Date",
            message:'Your Product cannot have expiry date less than a week'
        })
        return;
     }
 
    const item={
        id:enteredId,
        owner:farmer,
        metamask:metamask,
        email:email,
        name:enteredName,
        description:enteredDesc,
        address:enteredAddress,
        price:+enteredPrice,
        initialAmount:+enteredQuantity,
        amount:+enteredQuantity,
        img:enteredImgL,
        expDate:enteredExpDate
    };
    console.log(item);
    dispatch(saveProduct(item));
    setEnteredId('');
    setEnteredName('');
    setEnteredDesc('');
    setEnteredPrice('');
    setEnteredQuantity('');
    setEnteredAddress('');
    setEnteredImgL('');
    setEnteredExpDate('');
  };
  const setErrorHandler=()=>{setError(null)};
    return <div className={classes.main}>
     {Error && <Modal onClick={setErrorHandler}>
        <h3>{Error.title}</h3>
        <p>{Error.message}</p>
        <button className={classes.button} onClick={setErrorHandler}>Alright</button>
        </Modal>}
        <form className={classes.form} onSubmit={submitHandler}>
            <h2>Enter Product Details</h2>
            <div className={classes.field}>
            <label htmlFor="id">Id: </label>
            <input type='number' value={enteredId} id="id" name="id" onChange={idChangeHandler} placeholder='Enter Id' />
         </div>
         <div className={classes.field}>
         <label htmlFor="name">Name: </label>
         <input type='text' id="name" value={enteredName} name="name" onChange={nameChangeHandler} placeholder="Enter product name" />
         </div>
         <div className={classes.field}>
         <label htmlFor="desc">Description: </label>
         <input type='text' id="desc" value={enteredDesc} name="desc" onChange={descChangeHandler} placeholder='Enter product description'/>
         </div>
         <div className={classes.field}>
         <label htmlFor="address">Product Address: </label>
         <input type='text' id="address" value={enteredAddress} name="address" onChange={addrChangeHandler} placeholder='Enter product address'/>
         </div>
         <div className={classes.field}>
         <label htmlFor="price">Price: </label>
         <input type='number' id="price" value={enteredPrice} name="price" min='10' onChange={priceChangeHandler} placeholder='Enter price'/>
         </div>
         <div className={classes.field}>
         <label htmlFor="quan">Available Quantity: </label>
         <input type='number' id="quan" value={enteredQuantity} name="quan" min='10' onChange={quanChangeHandler} placeholder='Enter quantity'/>
         </div>
         <div className={classes.field}>
         <label htmlFor="imgL">Image Link: </label>
         <input type='text' id="imgL" value={enteredImgL} name="imgL" onChange={imgLChangeHandler} placeholder='Enter image link'/>
         </div>
         <div className={classes.field}>
         <label htmlFor="expDate">Expires On: </label>
         <input type='date' id="expDate" value={enteredExpDate} name="expDate" min='0' onChange={expDateChangeHandler} placeholder='Enter Expiry date'/>
         </div>
         <div className={classes.btnfield}>
         <Link className={classes.button} to='..' relative='path'>Cancel</Link>
         <button type='submit' className={classes.button} onClick={submitHandler}>Add Item</button>
         </div>
    </form>
    </div>
};

export default AddItem;