import React from 'react'

import {useNavigate} from 'react-router-dom'

const LandingPage = () => {

    const navigate=useNavigate()
  return (
    <div>

        <button onClick={()=>navigate('/register')}>Continue as a user</button>
        <br />

        <button onClick={()=>navigate('/centre-register')}>Continue as a centre owner</button>
      
    </div>
  )
}

export default LandingPage
