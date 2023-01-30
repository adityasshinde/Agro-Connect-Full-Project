import { createSlice } from "@reduxjs/toolkit";

const uiSlice=createSlice({
    name:'ui',
    initialState:{showCart:false,Notification:null,prevOrders:[],CurrentlyListed:[],farmerBalance:null,userEmail:null},
    reducers:{
       Cart(state){
        state.showCart=true;
         },
         hideCart(state){
           state.showCart=false;
         },
         setUserEmail(state,action){
           state.userEmail=action.payload;
         },
         setPrevOrders(state,action){
            state.prevOrders=action.payload;
          },
         setFarmerBalance(state,action){
            state.farmerBalance=action.payload;
          },
          setCurrentlyListed(state,action){
            state.CurrentlyListed=action.payload;
          },
         showNotification(state,action){
            state.Notification={
                status:action.payload.status,
                title:action.payload.title,
                message:action.payload.message
            }
        }
    }
});

export const uiActions=uiSlice.actions;
export default uiSlice;