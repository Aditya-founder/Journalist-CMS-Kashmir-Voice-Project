import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser, HiArrowSmRight, HiDocumentText} from 'react-icons/hi'
import { useEffect , useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signoutSuccess } from '../redux/user/userslice'



const DashSidebar = () => {
    const location   = useLocation()
    const dispatch = useDispatch();
      const [tab , setTab] = useState('');
      const {currentUser} = useSelector(state=>state.user);
       
      useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl)
          setTab(tabFromUrl);
        // console.log("url prams ", urlParams);
        // console.log("tabfrom url ",tabFromUrl);
    
    
      }, [location.search])

       const handleSignOut = async()=>{
              try{
                  const res= await fetch('/api/user/signout', {
                      method: 'POST',
                  });
      
                  const data = res.json();
                  
                  if(!res.ok){
                      console.log(data.message);
                  }else{
                      dispatch(signoutSuccess());
      
                  }
              }catch(error){
                  console.log(error.message);
              }
          }
      

  return (
    <Sidebar className='w-full md:w-56  ' >
        <Sidebar.Items className=''>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item as={'div'} active={tab==='profile'} icon={HiUser}  label={currentUser.isAdmin ? "Admin" : "User"} labelColor = 'dark'>
                Profile
                </Sidebar.Item>
                </Link>
                {
                    currentUser.isAdmin && (
                        <Link to='/dashboard?tab=posts'>
                <Sidebar.Item as={"div"}
                icon={HiDocumentText}
                active={tab==='posts'}>
                Posts
                </Sidebar.Item>
                </Link>
                    )
                }
                
                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar