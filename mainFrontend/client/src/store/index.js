import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import productSlice from "./product-slice";
import uiSlice from "./ui-slice";
import chainSlice from "./chain-slice";

const store=configureStore({
    reducer:{ui:uiSlice.reducer,cart:cartSlice.reducer,prod:productSlice.reducer,chain:chainSlice.reducer}
});

export default store;