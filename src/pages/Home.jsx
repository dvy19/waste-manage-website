import React, { useEffect  , useState} from 'react'
import Navbar from '../component/Navbar'
import AddItemCard from '../component/AddItemCard'
import { adminService } from '../services/adminService'
import CentreCard from '../component/CentreCard'
const Home = () => {

  const[centres,setCentres]=useState([]);

  const getCentre=async()=>{

    try{
      const data=await adminService.getAllCentres()

      console.log(data.centres)

      setCentres(data.centres)
    }
    catch(err){
      console.log(`${err}`)
    }
  }


  useEffect(()=>{
    getCentre()
  } , []);

  return (
   <>

   <Navbar></Navbar>

    <div className="p-20">
        <AddItemCard></AddItemCard>
    </div>

    {/* HORIZONTAL SCROLL CONTAINER */}
    <h1 className=" pl-20 text-3xl">All Centres Nearby</h1>
      <div className="flex space-x-5 pl-20 pt-10 overflow-x-auto  snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {centres.map((centre) => (
          <div 
            key={centre._id} 
            className="snap-start shrink-0 w-[280px] sm:w-[320px]"
          >
            <CentreCard
              image={centre.image}
              name={centre.name}
              mainMaterial={centre.material}
              owner={centre.owner}
              id={centre._id}
              location={centre.address}
            />
          </div>
        ))}
      </div>

   </>
  )
}

export default Home
