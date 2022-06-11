import React, { useState } from 'react'
import "./Login.css"
import { Link,useNavigate } from "react-router-dom";
import { auth } from './firebase';
import pic1 from './resumelogo.png';



function Login() {

  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = e => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email,password)
      .then(auth=>{
        history('/home')
      })
      .catch(error => alert(error.message))
  }

  const register = e => {
    e.preventDefault()

    auth
       .createUserWithEmailAndPassword(email,password)
       .then((auth) =>{

        //  console.log(auth)
        if(auth)
        {
          history('/home');
        }


       })
       .catch(error => alert(error.message))
  }



  return (
    <div className='login'>
      <Link to='/'>
        <img className='login__logo' src={pic1} />
      </Link>

      <div className='login__container'>
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <button type='submit' onClick={signIn} className='login__signInButton'>Sign-In</button>

          <p>
            By signing-in you agree to the GREEN FLAME Conditions of Use & Sale. Please
            see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
          </p>

          <button onClick={register} className='login__registerButton'>Create your Account</button>


        </form>


      </div>
    </div>
  )
}

export default Login