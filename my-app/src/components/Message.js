import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Layout from './Layout'
import Registration from './Registration'
import Login from './Login'
import Username from './Username'


const Message = () => {
  return (
    <div>9
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='/register' element={<Registration/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/username' element={<Username/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default Message