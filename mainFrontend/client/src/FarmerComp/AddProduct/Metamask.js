import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { saveFarmer } from "../../store/metamask-action";
import classes from './Metamask.module.css';
const Metamask=()=>{
    const navigation=useNavigation();
    const navigate=useNavigate();
    const username=localStorage.getItem('username');
    const isSubmitting=navigation.state==='submitting';
    const [enteredAddress,setEnteredAddress]=useState();
    const addressChangeHandler=(event)=>{
       setEnteredAddress(event.target.value);
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        if(enteredAddress.trim().length===0){
            return;
        }
        const newFarmer={
          username:username,
          metamask:enteredAddress
        }
        saveFarmer(newFarmer);
         navigate('..');

    };
    return <div className={classes.main}>
   <form onSubmit={submitHandler} className={classes.form}>
        <h3>Add Metamask Address</h3>

        <p>
          <label htmlFor="metamask">Metamask</label>
          <input id="metamask" type='text' name="metamask" onChange={addressChangeHandler} placeholder='Enter metamask address' required />
        </p>
        <div className={classes.actions}>
          <button disabled={isSubmitting}>{isSubmitting ? 'Processing..':'Submit'}</button>
        </div>
      </form>
    </div>
}

export default Metamask;