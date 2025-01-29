import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import {Button, Navbar} from 'flowbite-react'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Projects from './pages/Projects'
import Header from './components/Header'
import { FooterComponent } from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
const App = () => {
  return (
  <div >
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        </Route>
        
      </Routes>
      <FooterComponent/>
    </div>
  )
}

export default App