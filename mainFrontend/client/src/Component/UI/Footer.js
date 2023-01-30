import React from "react";
import classes from './Footer.module.css';
import logo from '../../images/logo1.png';
import f1 from '../../images/f1.png';
import f2 from '../../images/f2.png';
import f3 from '../../images/f3.png';
import m1 from '../../images/m1.png';
import { Link } from "react-router-dom";

const Footer=()=>{
    return <div className={classes.footer}>
        <section className={classes.logo}>
            <img src={logo} alt='Loading'></img>
            <Link to='/'>Agro-Connect</Link>
        </section>
        <section className={classes.features}>
           <div className={classes.mission}>
               <img src={m1} alt="Loading"></img>
               <span>Mission</span>
           </div>
           <div className={classes.cards}>
           <div className={classes.card}>
                <img src={f1} alt='Loading'></img>
                <p>Harness the power of technology to enhance agricultural productivity</p>
            </div>
            <div className={classes.card}>
                <img src={f2} alt='Loading'></img>
                <p>Improve access to a wide range of fresh, local produce for consumers </p>
            </div>
            <div className={classes.card}>
                <img src={f3} alt='Loading'></img>
                <p>Promoting sustainable agriculture for a healthy planet and thriving communities</p>
            </div>
           </div>
        </section>
        <section className={classes.links}>
        <Link to='/corner' className={classes.link}>Farmer's Corner</Link>
            <Link>About Us</Link>
            <Link>Contact Us</Link>
            
        </section>
    </div>
};

export default Footer;