import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidateData } from '../assets/utils/validate';

const Login = () => {
  const[isSignInForm, setIsSignInForm] = useState(true);
  const[errorMessage, setErrorMessage] = useState(null);

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick=()=>{
    //validate the form data
    console.log(fullName);
    const message= checkValidateData(email.current.value, password.current.value, fullName.current.value);
    setErrorMessage(message);

    // sign in/sign up
  }

  const toggleSignInForm =()=>{
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header/>
      <div className="absolute">
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/IN-en-20241230-TRIFECTA-perspective_5ab944a5-1a71-4f6d-b341-8699d0491edd_large.jpg" alt="bg-image"/>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input ref={fullName} className="p-4 my-4 w-full bg-gray-700" type="text" placeholder="Full Name" />}
        <input ref={email} className="p-4 my-4 w-full bg-gray-700" type="text" placeholder="Email Address" />
        <input ref={password} className="p-4 my-4 w-full bg-gray-700" type="password" placeholder="Password" />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up now" : "Already a User? Sign In now"}</p>
      </form>
    </div>
  )
}

export default Login