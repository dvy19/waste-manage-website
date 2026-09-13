import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Register   from './pages/Register'
import Login from './pages/Login'
import UserDetails from './pages/UserDetails'
import MapPicker from './pages/MapPicker'
import Home from './pages/Home'
import AddItems from './pages/AddItems'
import AddCentre from './admin/AddCentre'
import CentreDetailScreen from './pages/CentreDetails'

import ProfileScreen from './pages/ProfileScreen'
import UserItemScreen from './pages/UserItemScreen'

import PhoneLogin from './pages/PhoneLogin'
import AddSalesItem from './admin/AddSalesItem'


const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/userDetails' element={<UserDetails/>}/>

        <Route path='/user-profile' element={<ProfileScreen/>}></Route>

        <Route path='/home' element={<Home/>}></Route>

        <Route path='/add-item' element={<AddItems/>}></Route>

        <Route path='/add-centre' element={<AddCentre/>}></Route>

        <Route path='/phone-login' element={<PhoneLogin/>}></Route>

        <Route path="/centre-details/:id" element={<CentreDetailScreen/>}></Route>

        <Route path='/user-items' element={<UserItemScreen/>}></Route>


        <Route  path='/add-sales-item' element={<AddSalesItem/>}></Route>




      </Routes>

    </BrowserRouter>
  )
}

export default App
