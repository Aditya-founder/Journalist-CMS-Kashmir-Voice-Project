import React from 'react'
// import { BrowserRouter, Link } from 'react-router-dom'
// import {Button, Navbar} from 'flowbite-react'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Dashboard from './pages/Dashboard'
// import Signup from './pages/Signup
// import Signin from './pages/Admin'

// import Projects from './pages/Projects'
import Header from './components/Header'
// import { FooterComponent } from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import ScrollToTop from './components/ScrollToTop'
import PostPage from './pages/PostPage'
import Search from './pages/Search'
import Contact from './components/Contact'
import "@fontsource/eb-garamond"; // Defaults to weight 400
import "@fontsource/eb-garamond/400.css"; // Specify weight
import "@fontsource/eb-garamond/400-italic.css"; // Specify weight and style
import Admin from './pages/Admin'
import Article from './pages/Article'

const App = () => {
  return (
  <div >
    <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/admin" element={<Admin/>} />
        <Route path='/article' element={<Article/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute/>}>
        <Route path="/create-post" element={<CreatePost/>} />
        <Route path='/update-post/:postId' element={<UpdatePost/>}/>
        </Route>

        {/* <Route path="/projects" element={<Projects />} /> */}
        <Route path='/post/:postSlug' element={<PostPage/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      {/* <FooterComponent/> */}
    </div>
  )
}

export default App