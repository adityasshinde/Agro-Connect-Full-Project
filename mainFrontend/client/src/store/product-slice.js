import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:'products',
    initialState:{Available_Products:[]},
    reducers:{
        getAvailableProducts(state,action){
            state.Available_Products=action.payload;
          }
    }
});

export const productsActions=productSlice.actions;
export default productSlice;