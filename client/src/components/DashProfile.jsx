import { Alert, Button, Spinner, TextInput } from 'flowbite-react';
import React, { useState , useRef, useEffect} from 'react'
import {useSelector} from 'react-redux';
import { updateStart, updateFailure, updateSuccess } from '../redux/user/userslice';
import { useDispatch } from 'react-redux';


const DashProfile = () => {
    const {currentUser, loading}  = useSelector(state=>state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef  = useRef();
    const[formData, setFormData] = useState({});
    const[updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setupdateUserError]  =useState(null);
    const dispatch = useDispatch();

    


    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setUpdateUserSuccess(null);
        setupdateUserError(null);
        
        if(Object.keys(formData).length===0){
            setupdateUserError('No changes Made');
            return ;
        }

        try{
          
            dispatch(updateStart());
            const res  = await fetch(`/api/user/update/${currentUser._id}`, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(formData),
            });
            console.log("update api call hogyi ");
            
            const data = await res.json();   
            console.log("data from upate ", data);

            if(!res.ok){
                dispatch(updateFailure(data.message));
                setupdateUserError(data.message);
                return ;
            }
            else{
                // console.log("going to updatesyccess ");
                dispatch(updateSuccess(data));
                // console.log("done update success persiste");
                setUpdateUserSuccess('User Profile Update Successfull');
            }
            // console.log("successfully uupdate dashprofile ", data);

        }
        catch(error){
            
            dispatch(updateFailure(error.message));
            setupdateUserError(error.message);
        }
    }
    const handleChange = (e)=>{
        setFormData({...formData , [e.target.id] : e.target.value});
    }



    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))   
        };
    }

    const uploadImage= async ()=>{
        console.log("uploading image")
    }
    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    }, [imageFile])
    // console.log("image file url -> ", imageFile , imageFileUrl)

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center mx-auto font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4 '
        onSubmit={handleSubmit}
         >
            <input type="file" accept='image/*'
            className='hidden' 
            onChange={handleImageChange} 
            ref={filePickerRef}
            />
            <div className='w-32 h-32 overflow-hidden rounded-full self-center cursor-pointer shadow-md '
            onClick={()=> filePickerRef.current.click()}
            >

            <img src={imageFileUrl || currentUser.profilePicture} alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
            </div>


        <TextInput type='text' 
        id='username' 
        placeholder='username'
        defaultValue={currentUser.username}
        onChange={handleChange}
        />

        <TextInput type='email' 
        id='email' 
        placeholder='email'
        defaultValue={currentUser.email}
        onChange={handleChange}
        />

        <TextInput type='password' 
        id='password' 
        placeholder='Password' 
        
        onChange={handleChange}/>

        <Button type='submit' gradientDuoTone='purpleToBlue' disabled={loading} outline>
        {
            loading ? (
                <>
                <Spinner/>
                <span className='ml-2'>Loading...</span>
                </>
       
        ) : "Update"
        }
        </Button>
        </form>

    <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer  hover:text-red-700 '>Delete Account</span>
        <span className='cursor-pointer  hover:text-red-700 '>Sign Out</span>
    </div>
        {
            updateUserSuccess && (
                <Alert color='success' className='mt-5'>
                    {updateUserSuccess}
                </Alert>
            )
        }
        
        {
            updateUserError && (
                <Alert color='failure' className='mt-5'>
                    {updateUserError}
                </Alert>
            )
        }

    </div>
  )
}

export default DashProfile