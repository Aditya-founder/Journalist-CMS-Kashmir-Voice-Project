import { Table, Modal , Button, Spinner} from 'flowbite-react';
import React, { useEffect , useState} from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import {HiOutlineExclamationCircle} from 'react-icons/hi'


const DashPosts = () => {
  const {currentUser} = useSelector(state=>state.user);
  const[userPosts, setUserPosts] =useState([]);
  const[showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const[postIdToDelete , setPostIdToDelete] = useState('');
  const[loading, setLoading ] = useState(false);

  // console.log("userposts ",userPosts);
  // console.log("currentuser id" , currentUser._id);

  useEffect(()=>{
    const fetchPosts = async()=>{
   
      try{
        setLoading(true);
        const res  = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if(res.ok){
          setUserPosts(data.posts)
          if(data.posts.length < 9)
          {
            setShowMore(false);
          }
        }
        // console.log("res data" , data)         

        setLoading(false);
      }catch(error){
        console.log(error);
        setLoading(false);

      }
    }

    if(currentUser.isAdmin){

      fetchPosts();
    }
    
  }, [currentUser._id])


  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
  
      if (res.ok) {
        // Ensure new posts are added, and not the ones that already exist
        setUserPosts((prev) => {
          const newPosts = data.posts.filter(post => !prev.some(existingPost => existingPost._id === post._id));
          return [...prev, ...newPosts];
        });
  
        // Hide the "Show more" button if there are fewer than 9 posts in the new batch
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleDelete = async()=>{
    setShowModal(false);

    try{
      const res  = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      )
      const data = res.json();
      // console.log("data",data );
      // console.log("respnse", res);
      if(!res.ok){
        console.log(data.message);
        return ;
      }
      else{
          setUserPosts((prev)=>
          prev.filter((post)=>post._id!=postIdToDelete)
            )
      }
      
      
    }catch(error){
      console.log(error);

    }
  }
    
  return (
    <>
    {
      loading ? (
        <div className='flex flex-col gap-2 justify-center w-full items-center'>

          <Spinner />
          <span>Loading...</span>
        </div>
      ) 
      : (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 
    scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500
    '>
      {
        currentUser.isAdmin && userPosts.length > 0 ? (
          <>
            <Table hoverable  className='shadow-md'>
              <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Date Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
            </Table.Head>

            {
              userPosts.map((post, index)=>(
                <Table.Body key={index} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500'
                      />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                    </Table.Cell>
                    <Table.Cell>
                      {post.category}
                    </Table.Cell>
                    <Table.Cell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'
                    onClick={()=>{
                      setShowModal(true)
                      setPostIdToDelete(post._id);
                    }}
                    >Delete</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className='text-teal-500' to={`/update-post/${post._id}`}>
                        <span className='hover:underline'>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            }
            </Table>
            {/* {
              showMore && (
                <button onClick={handleShowMore} className='w-full hover:underline text-teal-500 self-center text-sm py-7'>
                  Show more
                </button>
              )
            } */}
          </>
        ) : 
        ( 
          <p>You have No Posts yet !! </p>
        ) 
      }

        <Modal
              show = {showModal}
              onClose={()=>setShowModal(false)}
              popup
              size='md'
              >
                  <Modal.Header/>
                  <Modal.Body>
                      <div className='text-center'>
                      <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
                      dark:text-gray-200 mb-4 mx-auto'/>
                      </div>
                      <h3
                      className='mb-5 text-lg text-gray-500 dark:text-gray-400'
                      >Are You sure You want to Delete this Post ?</h3>
      
                      <div className='flex justify-center gap-4'>
                          <Button color='failure' onClick={handleDelete}>
                              Yes, I'm sure
                          </Button>
                          <Button color='gray' onClick={()=>setShowModal(false)}>
                              No, Cancel
                          </Button>
                      </div>
      
                  </Modal.Body>
              </Modal>

      
    </div>
      )
    }
    </>
  )
}

export default DashPosts;