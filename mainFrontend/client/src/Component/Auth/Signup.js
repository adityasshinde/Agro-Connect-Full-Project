import { Form, useNavigation } from 'react-router-dom';
import classes from './Signup.module.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo1.png';
import { useState } from 'react';


function Signup() {
   //const data=useActionData();
   const navigation=useNavigation();
   const isSubmitting=navigation.state==='submitting';
   const [errorEmail,setErrorEmail]=useState(false)
   const [errorPass,setErrorPass]=useState(false)
   const passwordValidate=(event)=>{
    if(event.target.value.trim().length<8){
      setErrorPass(true)
    }else{
      setErrorPass(false)
    }
   }
   const emailValidate=(event)=>{
    if(!event.target.value.includes('@') || !event.target.value.includes('.')){
      setErrorEmail(true)
    }else{
      setErrorEmail(false)
    }
   }
  return (
    <div className={classes.main}>
     <div className={classes.brand}>
     <img src={logo} alt='Logo'></img>
      <h3>AgroConnect</h3>
     </div>
     <Form method="post" className={classes.form}>
        <h3>Create a new user</h3>
        <p>
          <label htmlFor="name">Name</label>
          <input id="name" type="name" name="name" placeholder='Enter your name' required />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onBlur={emailValidate} placeholder='Enter your email' required />
          {errorEmail && <span className={classes.error}>Email is not valid</span>}
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onBlur={passwordValidate} placeholder='Enter your password' required />
          {errorPass && <span className={classes.error}>Invalid Password</span>}
        </p>
        <div className={classes.actions}>
          <button disabled={isSubmitting} type='submit'>{isSubmitting ? 'Signing up..':'Signup'}</button>
        </div>
        <div className={classes.redi}>Already have an account? 
        <Link to='?mode=login'> Login</Link>
        </div>
      </Form>
    </div>
  );
}

export default Signup;

