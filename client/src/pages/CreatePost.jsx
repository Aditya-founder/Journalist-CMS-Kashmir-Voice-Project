import { Button, FileInput, Select, TextInput , Spinner, Alert} from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom';

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const[loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);  // To track progress
  const  [imageUploadError, setImageUploadError] = useState(null);
  const[newformData, setNewFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const[postloading , setPostLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState("");
  

  const navigate = useNavigate();
  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
   
  };

  // Upload to Cloudinary with progress tracking
  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please Select an Image")
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nahraf_up");
      formData.append('cloud_name', "dt8fsqka6");

      // Use XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.cloudinary.com/v1_1/dt8fsqka6/image/upload", true);

      // Update progress state during upload
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);  // Update the progress bar
        }
      };

      // Handle response when the upload is complete
      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setNewFormData({...newformData, image:data.secure_url});
          setImageUrl(data.secure_url);  // Store the uploaded image URL
        }
      };
      // Send the form data to Cloudinary
      xhr.send(formData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setImageUploadError(error.message);
      // console.log(error);
    }
  };


  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      setPostLoading(true);
      setPostSuccess("");
      const res = await fetch('/api/post/create',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(newformData),
      });
      const data = await res.json();

      if(!res.ok){
        setPublishError(data.message);
      }
    
      if(res.ok){
        setPublishError(null);
        setPostSuccess("post upload Successfully");
        navigate(`/post/${data.savedPost.slug}`)
      }
      console.log("successflly upllad", data);
      setPostLoading(false);

    }catch(error){
      setPostLoading(false);
      setPostSuccess(false);
      setPublishError("something went wrong");
      console.log(error);
    }
  }

  // console.log(newformData);

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title'
            className='flex-1'
            required id='title' 
            onChange={(e)=> setNewFormData({...newformData, title : e.target.value})}
            />

          <TextInput
          placeholder='Enter Custom Category'
          type='text'
          onChange={(e)=> setNewFormData({...newformData, category : e.target.value})} 
          />
        </div>
        <div className='flex-col gap-4 items-center justify-between border-4
        border-teal-500 border-dotted p-3'>
          <div className='flex gap-4 items-center justify-between'>
            <FileInput type='file' accept='image/*' onChange={handleFileChange} />
            <Button type='button' gradientDuoTone='purpleToBlue'
              onClick={handleUploadImage}
              size='sm' outline disabled={loading} >
            {
              loading ? (<>  
              <Spinner /> 
              <span className='ml-2'>Uploading...</span>
              </>
            )
              : "Upload Image"
            }  
            </Button>
          </div>

            {
              imageUploadError && (
                <Alert color='failure' className='mt-4'>
                  {imageUploadError}
                </Alert>
                )
            }
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-teal-500 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {imageUrl && <img src={imageUrl} alt="uploaded image" className="w-full h-full  object-cover mt-4" />}
        </div>
        <ReactQuill theme='snow' placeholder='write something...' 
        required className='h-72' 
        onChange={(value)=>{
          setNewFormData({...newformData, content : value})
        }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink' outline
          className='mt-12'
          disabled={loading || postloading}
          >
         {
          postloading ? (<>
            <Spinner/>
            <span className='ml-2'>Posting...</span>
          </>) : "Publish"
         }
        </Button>
        {
          publishError && <Alert className='mt-5' color="failure">{publishError}</Alert>
        }
        {
          postSuccess && <Alert className='mt-5' color="success">{postSuccess}</Alert>
        }
      </form>
    </div>
  );
};

export default CreatePost;
