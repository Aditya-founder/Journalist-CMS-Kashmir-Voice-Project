import { Avatar, Button, Dropdown, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'
import { toggleTheme } from '../redux/theme/themeslice'
import { signoutSuccess } from '../redux/user/userslice'
import { useNavigate } from 'react-router-dom'


const Header = () => {
    const path = useLocation().pathname;
    const {currentUser} = useSelector(state=>state.user)
    const dispatch = useDispatch();
    const {theme}  = useSelector(state => state.theme);
    const[searchTerm , setSearchTerm] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
            // console.log(searchTermFromUrl)
        }
    },[location.search])

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

        const handleSubmit = (e)=>{
            e.preventDefault();
            const urlParams = new URLSearchParams(location.search);
            urlParams.set('searchTerm', searchTerm);

            const searchQuery = urlParams.toString();
            navigate(`/search?${searchQuery}`);



        }
    

  return (
    <Navbar className='border-b-2 text-2xl dark:bg-black' >
    <Link
    to="/"
    className="self-center whitespace-nowrap text-sm sm:text-xl 
    font-semibold dark:text-white">
    <span className='text-2xl font-serif'> Fizala Khan</span>
    </Link>
    <form onSubmit={handleSubmit} className=''>
        <TextInput
        
        type='text'
        placeholder='Search...'
        rightIcon={AiOutlineSearch}
        className='hidden lg:inline dark:bg-black '
         value={searchTerm}
         onChange={(e)=> setSearchTerm(e.target.value)}
        />
    </form>

    <Button onClick={()=>navigate('/search')} className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
    </Button>
    
    <div className='flex gap-4 md:order-2'>
        <Button className='w-12 h-10 sm:inline' color="gray" pill
        onClick={()=> dispatch(toggleTheme())}
        >
            {
                theme === 'light' ? <FaMoon/> : <FaSun/>
            }
         </Button>
    {
        currentUser && (
        <Dropdown 
        arrowIcon={false}
        inline
        label = {
            <Avatar
            alt='user'
            img = "https://res.cloudinary.com/dt8fsqka6/image/upload/v1738603951/jfaxfuiizmbj9dk6hqmu.png"
            rounded
            />
        }
        >
            <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
            <Dropdown.Item>
                Profile
            </Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>

        </Dropdown>) 
    }
        
         <Navbar.Toggle/>
    </div>

    <Navbar.Collapse>

        <Navbar.Link active={path==='/'} as={'div'}>
                <Link to="/">
                    Home
                </Link>
            </Navbar.Link>  

        <Navbar.Link  active={path==='/blogs' } as={'div'}>
                <Link to="/blogs">
                    Blogs
                </Link>
            </Navbar.Link>  

        <Navbar.Link  active={path==='/contact'} as={'div'}>
                <Link to="/contact">
                    Email Us
                </Link>
            </Navbar.Link>    
         </Navbar.Collapse>   
    </Navbar>
  )
}

export default Header