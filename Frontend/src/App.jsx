import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import {isAuth} from './context/AuthContextProvider'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import UserRiding from './pages/UserRiding'


const App = () => {

  const {AuthUser,user,captain} = isAuth();

  return (
    <Routes>
       <Route path='/' element={<Start />}/>
       <Route path='/login' element={<UserLogin />}/>
       <Route path='/signup' element={<UserSignup />}/>
       <Route path='/captain-login' element={<CaptainLogin />}/>
       <Route path='/captain-signup' element={<CaptainSignup />}/>
       <Route path='/home' element={
        user ? <Home /> : <Start/>   
        }/>
      <Route path='/captain-home'element={
        captain ? <CaptainHome /> : <Start/>
      }/>
      <Route path='/riding' element = {<Riding/>} />
      <Route path='/captain-riding' element = {<CaptainRiding/>} />
      <Route path='/user-riding' element = {<UserRiding/>} />
    </Routes>
  )
}

export default App
