import React, {  useState } from "react";
import Item from "./item";
import classes from './Products.module.css';
import Notification from "../UI/Notification";
import { useSelector } from "react-redux";

const Products=()=>{
    const [searchElement,setSearchElement]=useState('');
    const availableProducts=useSelector(state=>state.prod.Available_Products);
    const notification =useSelector(state=>state.ui.Notification);
    const loadedMeals=[];
    for (const key in availableProducts){
        loadedMeals.push({
            id:availableProducts[key].id,
            key:key,
            email:availableProducts[key].email,
            metamask:availableProducts[key].metamask,
            farmer:availableProducts[key].owner,
            img:availableProducts[key].img,
            name:availableProducts[key].name,
            quantity:availableProducts[key].amount,
            price:availableProducts[key].price,
        });
    }
const productsAv=loadedMeals.map(item=><Item img={item.img} farmer={item.farmer} email={item.email} metamask={item.metamask} name={item.name} key={item.id} id={item.id} price={item.price} quantity={item.quantity} />)
let FilteredProducts=productsAv.map(item=>item);
const searchHandler=(event)=>{
    setSearchElement(event.target.value);
}
if(searchElement.trim().length>0){
     FilteredProducts=productsAv.filter(elem=>{
        return (elem.props.name.toUpperCase().includes(searchElement) || elem.props.name.toLowerCase().includes(searchElement.toLowerCase()));
    });
    if(FilteredProducts.length===0){
        FilteredProducts="No Results Found";
    }
}
    return <div className={classes.prod}>
            <input className={classes.input} type='text' placeholder="Search by name" onChange={searchHandler} />
             {notification && notification.status!=='success' && <Notification
             title={notification.title} 
             status={notification.status} 
             message={notification.message} />}
             <div className={classes.list}>
                { FilteredProducts}
                </div>
    </div>
};

export default Products;