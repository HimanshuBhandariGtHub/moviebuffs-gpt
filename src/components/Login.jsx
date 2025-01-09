import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const[isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm =()=>{
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header/>
      <div className="absolute">
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/IN-en-20241230-TRIFECTA-perspective_5ab944a5-1a71-4f6d-b341-8699d0491edd_large.jpg" alt="bg-image"/>
      </div>
      <form className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input className="p-4 my-4 w-full bg-gray-700" type="text" placeholder="Full Name" />}
        <input className="p-4 my-4 w-full bg-gray-700" type="text" placeholder="Email Address" />
        <input className="p-4 my-4 w-full bg-gray-700" type="password" placeholder="Password" />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up now" : "Already a User? Sign In now"}</p>
      </form>
    </div>
  )
}

export default Login