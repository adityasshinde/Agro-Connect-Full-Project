import React from "react";
import Products from "./Layout/Products";
import Cart from "./Cart/Cart";
import { useSelector } from "react-redux";
import Summary from "./Layout/Summary";

const Customer=(props)=>{
    return <>
            <main>
            <Summary></Summary>
            <Products></Products>
            </main>
            </>
};

export default Customer;