import { createContext,useState,useEffect} from "react"
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
const AuthContext=createContext();
export default AuthContext;

export const AuthProvider=({children})=>{
    
    const [user,setUser]=useState(localStorage.getItem('authTokens')? jwt_decode(localStorage.getItem('authTokens')):null)
    const [authTokens,setAuthTokens]=useState(()=>localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')):null)
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()

    const loginUser=async(e)=>{
        e.preventDefault();
        // console.log("submitted successfully")
        let response=await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                    'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        }) 
        let data=await response.json()

        if(response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }
        else{
            alert('something went wrong')
        }
        console.log(data)
    }

    const logOut=()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        //navigate('/login')

    }


    const updateToken=async()=>{
        // console.log("update token successfully")
        let response=await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                    'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        }) 
        let data=await response.json()

        if(response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }
        else{
            logOut()
        }
        
        if(loading){
            setLoading(false)
        }
    }

    // ....................................................................................................

    const createNote = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/api/signup/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':e.target.name.value,'password':e.target.password.value,'email':e.target.email.value})
        });
 
    }







    const ContextData={
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logOut:logOut,
        createNote:createNote
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }

        let interval=setInterval(() => {
            if(authTokens){
                updateToken()
            }
        }, 1000*60*4);
        return ()=> clearInterval(interval)
    },[authTokens])
    return(
        <AuthContext.Provider value={ContextData}>
            {loading?null:children}
        </AuthContext.Provider>
    )
}