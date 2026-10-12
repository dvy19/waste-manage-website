import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Register   from './pages/Register'
import Login from './pages/Login'
import UserDetails from './pages/UserDetails'
import MapPicker from './pages/MapPicker'
import Home from './pages/Home'
import AddItems from './pages/AddItems'
import AddCentre from './pages/Centre/AddCentre'
import CentreDetailScreen from './pages/CentreDetails'

import ProfileScreen from './pages/ProfileScreen'
import UserItemScreen from './pages/UserItemScreen'

import PhoneLogin from './pages/PhoneLogin'
import AddSalesItem from './admin/AddSalesItem'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'

import TrackItem from './pages/TrackItem'
import CreateCoupon from './pages/CreateCoupon'
import SalesItemDetails from './pages/SalesItemDetails'

import BuyItem from './pages/BuyItem'
import AllOrders from './pages/AllOrders'
import AiSuggestionScreen from './pages/AiSuggestionScreen'
import LandingPage from './pages/LandingPage'
import CentreRegister from './pages/Centre/CentreRegister'
import CentreLogin from './pages/Centre/CentreLogin'
import CentreHome from './pages/Centre/CentreHome'


const App = () => {
  return (
    <BrowserRouter >

      <Routes>

        <Route path='/' element={<LandingPage/>}></Route>

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

        <Route path='/buy-item/:id' element={<SalesItemDetails/>}></Route>

        <Route path='/buy-now' element={<BuyItem/>}></Route>


        <Route  path='/add-sales-item' element={<AddSalesItem/>}></Route>


        <Route path='/admin-login' element={<AdminLogin/>}></Route>
        <Route path='/admin-dash/:id' element={<AdminDashboard/>}></Route>


        <Route path='/track-item' element={<TrackItem/>}></Route>

        <Route path='/create-coupon' element={<CreateCoupon/>}></Route>
        
        <Route path="/user-orders" element={<AllOrders/>}></Route>

        <Route path='/ai-suggest' element={<AiSuggestionScreen/>}></Route>

        <Route path='/centre-register' element={<CentreRegister/>}></Route>
        <Route path='/centre-login' element={<CentreLogin/>}></Route>
        <Route path='/centre-home' element={<CentreHome/>}></Route>






      </Routes>

    </BrowserRouter>
  )
}

export default App
