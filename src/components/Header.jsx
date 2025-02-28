import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const dispatch= useDispatch();
const navigate = useNavigate();
const user = useSelector(store=>store.user);
console.log(user);

const handleSignOut=()=>{
  signOut(auth).then(() => {
    // navigate("/");
  }).catch((error) => {
    navigate("/error")
  });
}

useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user; //if user signup or signin, user store update
        //we can get "uid, email, displayName" from user obj 
        dispatch(addUser({uid:uid, email:email, displayName: displayName, photoURL: photoURL}));
        navigate("/browse");
      } else {
        //if User is signed out, user store update
        dispatch(removeUser());
        navigate("/");
      }
    });
}, [])

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7f67-86aa-d06aa27c6cc0/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      alt="logo" />
      {user && <div className="flex p-2">
        <img alt="userIcon" className="w-12 h-12" src={user?.photoURL} />
        <button onClick={handleSignOut} className="font-bold text-white">(SignOut)</button>
      </div>}
    </div>
  )
}

export default Header