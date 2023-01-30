
import { productsActions } from "./product-slice";
import { uiActions } from "./ui-slice";

export const fetchAvailableProducts=()=>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotification({
            status:'pending',
            title:'Pending.....',
            message:'Fetching Products data pending !!'
          }));
        const fetchData=async()=>{
            const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/availableProducts.json');
            if(!response.ok){
                throw new Error();
            };
            const data=await response.json();
            return data;
        };
        try{
            const productData=await fetchData();
            dispatch(productsActions.getAvailableProducts(productData));
            dispatch(uiActions.showNotification({
                status:'success',
                title:'Success.....',
                message:'Fetched Product data Successfully !!'
              }));
        }catch(error){
            dispatch(uiActions.showNotification({
                status:'error',
                title:'Error.....',
                message:'Fetching Products data failed !!'
              }));
        }

    };
};

export const saveProduct=(item)=>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotification({
            status:'pending',
            title:'Pending.....',
            message:'Sending Cart data !!'
          }));
        const saveData=async()=>{
            const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/availableProducts.json',{
                method:'POST',
                body:JSON.stringify(item),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(!response.ok){
                throw new Error();
            };
        };
        try{
            await saveData();
            dispatch(uiActions.showNotification({
                status:'success',
                title:'Success.....',
                message:'Sent Product data Successfully !!'
              }));
        }catch(error){
            dispatch(uiActions.showNotification({
                status:'error',
                title:'Error.....',
                message:'Sending Product data failed !!'
              }));
        }

    };
};
export const saveOrder=(item)=>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotification({
            status:'pending',
            title:'Pending.....',
            message:'Saving Order data !!'
          }));
        const sendData=async()=>{
            const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/Order.json',{
                method:'POST',
                body:JSON.stringify(item),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(!response.ok){
                throw new Error();
            };
        };
        try{
            await sendData();
            dispatch(uiActions.showNotification({
                status:'success',
                title:'Success.....',
                message:'Saved Order data Successfully !!'
              }));
        }catch(error){
            dispatch(uiActions.showNotification({
                status:'error',
                title:'Error.....',
                message:'Saving Order data failed !!'
              }));
        }

    };
};
export const editData=(idArray)=>{
    return async(dispatch)=>{
        const fetchData=async()=>{
            const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/availableProducts.json');
            if(!response.ok){
                throw new Error();
            };
            const data=await response.json();
            return data;
        };
        const productData=await fetchData();
        for(const i in productData){
             for(const j in idArray){
                if(productData[i].id===idArray[j].id){
                    console.log('yes');
                    productData[i].amount-=idArray[j].decreseAmt;
                    if(productData[i].amount===0){
                        delete productData[i];
                    }
                }
             }
        }
        const sendRequest=async (newProdArray)=>{
            const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/availableProducts.json',{
                method:'PUT',
                body:JSON.stringify(newProdArray)
              });
              if(!response.ok){
                throw new Error('Sending response failed!');
              }
              else{
                console.log("Available products updated")
              }
          };
          sendRequest(productData);


    };
};
