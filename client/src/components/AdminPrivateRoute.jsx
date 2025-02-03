import React from 'react'
import { Outlet , Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux'

const AdminPrivateRoute = () => {
    const {currentUser } = useSelector((state)=>state.user);
    // console.log("current user in private route ", currentUser)

  return (currentUser && currentUser.isAdmin ? <Outlet/> : <Navigate to="/dashboard" />)
}

export default AdminPrivateRoute;