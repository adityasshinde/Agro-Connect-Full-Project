import { Form, useNavigation } from 'react-router-dom';
import classes from './Login.module.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo1.png';

// import AuthContext from '../../AuthContext';
// import { useContext } from 'react';


function Login() {
 // const data=useActionData();
   const navigation=useNavigation();
   const isSubmitting=navigation.state==='submitting';
   
  return (
    <div className={classes.main}>
     <div className={classes.brand}>
      <img src={logo} alt='Logo'></img>
      <h3>AgroConnect</h3>
     </div>
     <Form method="post" className={classes.form}>
        <h3>Log In</h3>
        <p>
          <label htmlFor="email">username</label>
          <input id="email" type='text' name="email" placeholder='Enter your username'  required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password"  placeholder='Enter your password' required />
        </p>
        <div className={classes.actions}>
          <button disabled={isSubmitting} type='submit'>{isSubmitting ? 'Logging in':'Login'}</button>
        </div>
        <div className={classes.redi}>New user? 
        <Link to='?mode=signup'> Signup</Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;

