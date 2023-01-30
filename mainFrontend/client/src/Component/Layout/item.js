import React, { useState } from 'react';
import classes from './item.module.css';
import ItemForm from './itemForm';
import Description from './Description';

const Item =(props)=>{
    const [showDesc,setShowDesc]=useState(false);
    const showFullDesc=()=>{
        setShowDesc(true);
    };
    const hideDescHandler=()=>{
        setShowDesc(false);
    };
    return <div className={classes.item} >
           <img src={props.img} alt="loading" onClick={showFullDesc} className={classes.img}></img>
           <div className={classes.inf}>
            <p className={classes.infItem}><span onClick={showFullDesc}>{props.name}</span></p>
            <p className={classes.infItem}><span onClick={showFullDesc}>{props.price} AGC per kg</span></p>
            <p className={classes.infItem}>Avalaible:<span onClick={showFullDesc}>{props.quantity}kg</span></p>
           </div>
           <ItemForm name={props.name} farmer={props.farmer} metamask={props.metamask} email={props.email} price={props.price} quantity={props.quantity} id={props.id} />
           {showDesc && <Description hideDesc={hideDescHandler} id={props.id} />}
   </div>
};

export default Item;