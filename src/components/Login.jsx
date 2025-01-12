import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';



const Login = () => {
  const[isSignInForm, setIsSignInForm] = useState(true);
  const[errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch= useDispatch();

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick=()=>{
    //validate the form data
    // console.log(fullName, email, password);
    // isSignInForm && fullName.current.value , to check how to implement when input field in empty
    // const message= isSignInForm ? checkValidateData(email.current.value, password.current.value) : checkValidateData(fullName.current.value, email.current.value, password.current.value);
    const message= checkValidateData(email.current.value, password.current.value);
    setErrorMessage(message);

    // 1. logic for sign in/sign up : if(message ===null){ //as msg ll only return null, when there is no error else return string
    //       // sign in/sign up 
    // }

    // 2. u can return as soon as it encounters error string or message, n not proceed further, and if no message thn signin
    //as dont want to write whole signin/signup logic inside if
    if(message) return;

    // sign in/sign up
    if(!isSignInForm){
      //sign up logic
      //its returning a promise with catch logic for errors
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // console.log(user); //if my response is success, it ll give me user object, and sign in automatically and if error in api, go into catch block,
      //n catch tht error and if api is successfull, it ll give us the log
      //as soon as new user is sucessfully registered, i updating the updating d profile with name and photo url and if error, thn setErrorMessage with error.message
      updateProfile(user, {
        displayName: fullName.current.value, photoURL: "https://avatars.githubusercontent.com/u/126437529?s=400&u=1a23d1f0746cce037b2c19779cc865ba96197f9e&v=4"
      }).then(() => {
        const {uid, email, displayName, photoURL} = auth.currentUser; //here we r trying to fetch user from updated value
        dispatch(addUser({uid:uid, email:email, displayName: displayName, photoURL: photoURL}));
        navigate("/browse");
      }).catch((error) => {
        setErrorMessage(error.message);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage); //to show error msg
    });
    }
    else{
      // sign in logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log(user); //to validate if api sucessfull or not
      navigate("/browse")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage);
    });
      }

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