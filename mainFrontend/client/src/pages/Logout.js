import { redirect } from "react-router-dom";

export function action(){
    localStorage.removeItem('authTokens');
    localStorage.removeItem('username');
    localStorage.removeItem('metamask');
    localStorage.removeItem('status');
    
    return redirect('/');
}