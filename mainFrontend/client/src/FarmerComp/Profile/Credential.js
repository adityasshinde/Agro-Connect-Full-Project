import React from "react";
import Card from "../../Component/UI/Card";
import dp from '../../images/farmer.jpg';
import classes from './Credential.module.css';



const Credential=(props)=>{
    return <Card>
        <img alt="Loading" src={dp}></img>
        <p className={classes.inf}>Username: <span>{props.username}</span></p>
        <p className={classes.inf}>Metamask Address: <span>{props.metamask}</span></p>
        <p className={classes.inf}>Account Balance: <span>{props.balance} Wei</span></p>
    </Card>
};

export default Credential;