
 export const saveFarmer=async (newFarmer)=>{

        const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/farmers.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newFarmer)
        });
        if(!response.ok){
            throw new Error();
        };
        localStorage.setItem('metamask',newFarmer.metamask);
}


