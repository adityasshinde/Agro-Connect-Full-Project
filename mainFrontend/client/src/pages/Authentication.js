import { json, redirect, useSearchParams } from "react-router-dom";
import Signup from "../Component/Auth/Signup";
import Login from "../Component/Auth/Login";
import { sendEmail } from "../store/chain-action";



function AuthenticationPage() {
    const [searchParams]=useSearchParams();
    const isSignup=searchParams.get('mode')==='signup';
  return <>
  {!isSignup && <Login />}
  {isSignup && <Signup/>}
  </>;
}

export default AuthenticationPage;

export async function action({request}){
  const searchParams=new URL(request.url).searchParams;
  const mode=searchParams.get('mode')||'login';
  if(mode!=='login' && mode!=='signup'){
    throw json({message:"Unsupported mode"},{status:422})
  }
  const data=await request.formData();
    if(mode==='login'){
     
      const authData={
        username:data.get('email'),
        password:data.get('password')
      }
      const response=await fetch('http://127.0.0.1:8000/api/token/',{
        method:'POST',
        headers:{
                'Content-Type':'application/json'
        },
        body:JSON.stringify(authData)
    });
    if(!response.ok){
      alert('Please Enter valid username or password')
      return redirect('/auth')
    //throw json({message:"Could not authenticate"},{status:502})
    }
    const resData=await response.json()
    if(response.status===200){
        localStorage.setItem('authTokens',JSON.stringify(resData));
        localStorage.setItem('username',authData.username);
        return redirect('/')
        // console.log(authData.username)
        // return redirect(`/?user=${authData.username}`)
    }
    else{
        alert('something went wrong')
    }
    }
    if(mode==='signup'){
      const authData={
        username:data.get('name'),
        password:data.get('password'),
        email:data.get('email')
      }
      await fetch('http://localhost:8000/api/signup/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    });
    const response=await fetch('https://agro-connect-e7a75-default-rtdb.firebaseio.com/users.json',{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({username:authData.username,email:authData.email})
  });
  if(!response.ok){
      throw new Error();
  };
  const emailData={
    name:authData.username,
    email:authData.email,
    message:`Congratulations......!!! You have successfully registered for "Agro-Connect".`
   }
   console.log(emailData);
   sendEmail(emailData);
    return redirect('/auth')
  
    }
}