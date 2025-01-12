import React from 'react'
import Login from './Login'
import { Browse } from './Browse'
import { createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import {onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { useEffect } from 'react'

const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path:"/",
            element: <Login/>,
        },
        {
            path:"/browse",
            element:<Browse/>,
        },
    ]);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email, displayName, photoURL} = user; //if user signup or signin, user store update
              //we can get "uid, email, displayName" from user obj 
              dispatch(addUser({uid:uid, email:email, displayName: displayName, photoURL: photoURL}));
            } else {
              //if User is signed out, user store update
              dispatch(removeUser());
            }
          });
    }, [])

  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
    
  )
}

export default Body