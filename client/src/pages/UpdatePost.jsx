import { Button, FileInput, Select, TextInput, Spinner, Alert } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState("");
  const { currentUser } = useSelector(state => state.user);
  const [customCategory, setCustomCategory] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  // State to hold form data
  const [newformData, setNewFormData] = useState({
    title: "",
    content: "",
    category: "uncategorized",
    image: ""
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }

        if (res.ok && data.posts.length > 0) {
          const fetchedPost = data.posts[0];
          setNewFormData({
            title: fetchedPost.title || "",
            content: fetchedPost.content || "",
            category: fetchedPost.category || "uncategorized",
            image: fetchedPost.image || ""
          });
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setPublishError("Failed to fetch post details.");
      }
    };

    fetchPost();
  }, [postId]);

  console.log("new for data", newformData);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload image and update state
  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please Select an Image");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nahraf_up");
      formData.append('cloud_name', "dt8fsqka6");

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.cloudinary.com/v1_1/dt8fsqka6/image/upload", true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setNewFormData(prevData => ({ ...prevData, image: data.secure_url }));
          setImageUploadError(null);
        } else {
          setImageUploadError("Failed to upload image");
        }
        setLoading(false);
      };

      xhr.onerror = () => {
        setLoading(false);
        setImageUploadError("Image upload failed. Please try again.");
      };

      xhr.send(formData);
    } catch (error) {
      setLoading(false);
      setImageUploadError(error.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPostLoading(true);
      setPostSuccess("");
       // If custom category is filled, use it instead of "custom"
    const finalCategory = newformData.category === "custom" ? customCategory : newformData.category;


      const res = await fetch(`/api/post/updatepost/${postId}/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newformData, category: finalCategory }), // Use finalCategory
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
      } else {
        setPublishError(null);
        setPostSuccess("Post updated successfully");
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.error(error);
      setPublishError("Something went wrong.");
    } finally {
      setPostLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCustomCategory("");  // Reset the custom input field
    }
    setNewFormData(prev => ({ ...prev, category: value }));
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            className='flex-1'
            required
            value={newformData.title}
            onChange={(e) => setNewFormData(prev => ({ ...prev, title: e.target.value }))}
          />

        <div className='flex flex-col gap-2'>
            <TextInput
              type='text'
              placeholder='Enter custom category'
              value={newformData.category}
              onChange={handleCategoryChange}
            />
        </div>
        </div>

        <div className='flex-col gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <div className='flex gap-4 items-center justify-between'>
            <FileInput type='file' accept='image/*' onChange={handleFileChange} />
            <Button type='button' gradientDuoTone='purpleToBlue' onClick={handleUploadImage} size='sm' outline disabled={loading}>
              {loading ? <><Spinner /> <span className='ml-2'>Uploading...</span></> : "Change Image"}
            </Button>
          </div>

          {imageUploadError && <Alert color='failure' className='mt-4'>{imageUploadError}</Alert>}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          )}
          {newformData.image && <img src={newformData.image} alt="Uploaded" className="w-full h-full object-cover mt-4" />}
        </div>

        <ReactQuill theme='snow' placeholder='Write something...' required className='h-72'
          value={newformData.content}
          onChange={(value) => setNewFormData(prev => ({ ...prev, content: value }))}
        />

        <Button type='submit' gradientDuoTone='purpleToPink' outline className='mt-12' disabled={postLoading}>
          {postLoading ? <><Spinner /><span className='ml-2'>Updating...</span></> : "Update Post"}
        </Button>

        {publishError && <Alert className='mt-5' color="failure">{publishError}</Alert>}
        {postSuccess && <Alert className='mt-5' color="success">{postSuccess}</Alert>}
      </form>
    </div>
  );
};

export default UpdatePost;
