import React from 'react'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth}  from "firebase/auth"
import { app } from '../firebase'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userslice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const handleGoogleClick = async ()=>{
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider()
        // console.log("google auth calling ", provider);
        // provider.setCustomParameters({ prompt: 'select-account' });
        try {
        dispatch(signInStart());
        console.log("result from google start ");
        const resultFromGoogle = await signInWithPopup(auth, provider);
        //lets send the data to backend 
        console.log("result from google end", resultFromGoogle.user);

          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name: resultFromGoogle.user.displayName,
                email: resultFromGoogle.user.email,
                googlePhotoUrl : resultFromGoogle.user.photoURL
            })
          })
          const data = await res.json();

          if(res.ok){
            dispatch(signInSuccess(data))
            navigate('/')
            console.log(data);
          }
        } catch (error) {
            
            dispatch(signInFailure(error.message));
          console.log("Sign-in Error:", error.message);
        }
    }

    // console.log("env file", import.meta.env.VITE_FIREBASE_API_KEY);
    
    return (
    
     <Button gradientDuoTone='pinkToOrange' 
     onClick={handleGoogleClick}
     outline type='button' >
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}

export default OAuth