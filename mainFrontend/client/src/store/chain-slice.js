import { createSlice } from "@reduxjs/toolkit";

const chainSlice=createSlice({
    name:'chain',
    initialState:{connectMessage:'Connect',currentAccount:'',holdingBronzeBadge:false,holdingSilverBadge:false,holdingGoldBadge:false,totalPrevPurchase:0},
    reducers:{
        setConnectMessage(state,action){
            state.connectMessage=action.payload;
        },
        setCurrentAccount(state,action){
           state.currentAccount=action.payload;
        },
        setHoldingBronzeBadge(state,action){
            state.holdingBronzeBadge=action.payload;
        },
        setHoldingSilverBadge(state,action){
            state.holdingSilverBadge=action.payload;
        },
        setHoldingGoldBadge(state,action){
            state.holdingGoldBadge=action.payload;
        },
        setTotalPrevPurchase(state,action){
            state.totalPrevPurchase=action.payload;
        }
     
    },
});

export const chainActions=chainSlice.actions;
export default chainSlice;