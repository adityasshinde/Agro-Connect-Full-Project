import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import classes from './Summary.module.css';

const Summary=()=>{
const token=useRouteLoaderData('root');

    return <div className={classes.main}>
        <span className={classes.head}>Agro-Connect</span>
        <span className={classes.span}>Sowing seeds for sustainable tomorrow.....!!</span>
        {!token && <Link className={classes.button} to='/auth'>Login</Link>}
    </div>
};


export default Summary;