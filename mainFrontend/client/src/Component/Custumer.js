import React from "react";
import Products from "./Layout/Products";
import Cart from "./Cart/Cart";
import { useSelector } from "react-redux";
import Summary from "./Layout/Summary";

const Customer=(props)=>{
    const showCart=useSelector(state=>state.ui.showCart);
    return <>
        {showCart && <Cart></Cart>}
            <main>
            <Summary></Summary>
            <Products></Products>
            </main>
            </>
};

export default Customer;