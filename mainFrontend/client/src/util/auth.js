import { redirect } from "react-router-dom";

export function getAuthToken(){
    const token=localStorage.getItem('authTokens');
    const duration=getTokenDuration();
    if(!token){
        return null;
    }
    if(duration<0){
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader(){
    return getAuthToken();
}

export function getTokenDuration(){
    const storedExpirationDate=localStorage.getItem('expiration');
    const expirationDate=new Date(storedExpirationDate);
    const now=new Date();
    const duration=expirationDate.getTime()-now.getTime();
    return duration;
}

export function checkAuthLoader(){
    const token=getAuthToken();
    if(!token){
        return redirect('/auth');
    }
    return token;
}