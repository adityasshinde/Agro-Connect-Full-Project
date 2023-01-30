import { createSlice } from "@reduxjs/toolkit";

const chainSlice=createSlice({
    name:'chain',
    initialState:{connectMessage:'Connect',currentAccount:''},
    reducers:{
        setConnectMessage(state,action){
            state.connectMessage=action.payload;
        },
        setCurrentAccount(state,action){
           state.currentAccount=action.payload;
        }
    },
});

export const chainActions=chainSlice.actions;
export default chainSlice;