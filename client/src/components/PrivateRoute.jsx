import React from 'react'
import { Outlet , Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const {currentUser } = useSelector((state)=>state.user);
    // console.log("current user in private route ", currentUser)

  return (currentUser ? <Outlet/> : <Navigate to='/signin'/>)
}

export default PrivateRoute