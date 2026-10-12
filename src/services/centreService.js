
import api from '../api/axios'
import { endpoints } from '../api/endpoints'
const centreService={

    getMyCentre:async()=>{

        const data=await api.get(endpoints.GET_MY_CENTRE)
        return data.data
    }
}

export default centreService