import React, { useEffect, useState } from 'react'
import ItemCard from '../component/ItemCard'
import Navbar from '../component/Navbar'
import {itemService} from '../services/itemService'
const UserItemScreen = () => {

    const[items,setItems]=useState([]);

    const getItems=async()=>{

        try{

            const items=await itemService.getUserItems()
            console.log(items.items)

            setItems(items.items)
        
        }
        catch(err){
            console.log(`${err}`)
        }
    }

    useEffect(()=>{
        getItems()
    } , [])
  return (
   <>

   <Navbar></Navbar>

    <div className='p-20'>

       {items.map((item) => (
                 <div 
                   key={item._id} 
                 >
                  <ItemCard item={item}/>
                 </div>
               ))}
    </div>
   </>
  )
}

export default UserItemScreen
