import { endpoints } from "../api/endpoints"
import api from '../api/axios'

export const authService={



    register:async(req,res)=>{

        const data= await api.post(endpoints.REGISTER , req)

        return data.data
    },

    login:async(req,res)=>{

        const data=await api.post(endpoints.LOGIN , req)

        return data.data
    }
}