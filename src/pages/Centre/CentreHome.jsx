import React, { useEffect, useState } from 'react'

import centreService from '../../services/centreService'


import CentreNavbar from './CentreNavbar'
import CentreCard from './CentreCard'


const CentreHome = () => {

    const[centre,setCentre]=useState({})

    const getOwnCentre=async()=>{

        try{

            const centre=await centreService.getMyCentre()

            console.log(centre)

            setCentre(centre.centre)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getOwnCentre()
    } , [])
  return (
    <div>
      <CentreNavbar></CentreNavbar>

    <div className="p-4">
      <CentreCard centre={centre} />
    </div>
    </div>
  )
}

export default CentreHome
