import React from 'react'
import Navbar from '../component/Navbar'
import AddItemCard from '../component/AddItemCard'
const Home = () => {
  return (
   <>

   <Navbar></Navbar>

    <div className="p-20">
        <AddItemCard></AddItemCard>
    </div>

   </>
  )
}

export default Home
