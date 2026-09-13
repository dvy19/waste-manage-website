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
    },

    createProfile:async(formData)=>{

        const data=new FormData();

        data.append("phoneNumber" , formData.phoneNumber);
        data.append("city",formData.city);
        data.append("pinCode", formData.pinCode),
        data.append("address",formData.address);

        if(formData.profile){
            data.append("profile",formData.profile)
        }

        data.append(
            'coordinates',
            JSON.stringify(formData.coordinates)
        );

        const response=await api.post(endpoints.CREATE_PROFILE,data , {
            headers: {
    "Content-Type": "multipart/form-data"
}
        })

        return response.data

    },

    getProfile:async()=>{

        const profile=await api.get(endpoints.GET_PROFILE)
        
        return profile.data


    },


    getUserStats:async()=>{
        const stats=await api.get(endpoints.USER_STATS)
        return stats.data
    }
}