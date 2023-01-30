import React from 'react';
import classes from './Card.module.css';

const Card=props=>{
    const cardClass=`${classes['card']} ${props.className && props.className}`;
    return <div className={cardClass}>{props.children}</div>
};

export default Card;