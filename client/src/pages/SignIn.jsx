import { Label, Button, TextInput, Spinner, Alert } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userslice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'
// import { useSelector } from 'react-redux'


const Signin = () => {  
  
  const [formData, setFormData] = useState({});
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, error:errorMessage}  = useSelector(state=>state.user)

  const handleChange = (e)=>{
      setFormData({...formData, [e.target.id] : e.target.value.trim()})
  }

  // console.log("ENV FIRE ",  import.meta.env.VITE_FIREBASE_API_KEY);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if( !formData.email || !formData.password){
      return dispatch(signInFailure("PLease FIll out all the fields"))

      }
    try{
      dispatch(signInStart());
      const res  = await fetch('/api/auth/signin', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData),
      });

      const data= await res.json();
      console.log(data);

      if(data.success===false){
          dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
      
    }catch(error){
    dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5' >
        {/* left  */}
        <div className='flex-1'>
           <Link
              to="/"
              className="font-bold text-4xl dark:text-white">
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 
              via-purple-500 to-pink-500 rounded-lg text-white'>Farhan</span>
              <span className='text-2xl'> Blog</span>
              </Link>

              <p className='text-sm mt-5'>
                this is a demo projects.  You can sign in with your email and password
                or with Google
              </p>
        </div>

        {/* right  */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
           
            
            <div>
              <Label value="Email"/>
              <TextInput
              type="email"
              placeholder='email'
              id='email'
              onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Password"/>
              <TextInput
              type="password"
              placeholder='********'
              id='password'
              onChange={handleChange}
              />
            </div>
      <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
        {
          loading ? <Spinner/>: "Sign In"
        }
        {
          loading && <span className='pl-3'>Loading...</span>
        }
      </Button>
      <OAuth/>
          </form>

      <div className='flex gap-2 text-sm mt-5'>
        <span>Don't Have an account?</span>
        <Link to='/signup' className='text-blue-500'>
          Sign Up
        </Link>
      </div>
          {
            errorMessage && (
              <Alert className='mt-5 ' color="failure">
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Signin