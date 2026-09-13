import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Register   from './pages/Register'
import Login from './pages/Login'
import UserDetails from './pages/UserDetails'
import MapPicker from './pages/MapPicker'
import Home from './pages/Home'
import AddItems from './pages/AddItems'


const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/userDetails' element={<UserDetails/>}/>

        <Route path='/home' element={<Home/>}></Route>

        <Route path='/add-item' element={<AddItems/>}></Route>




      </Routes>

    </BrowserRouter>
  )
}

export default App
