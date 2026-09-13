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

        data.append("phoneNumber" , phoneNumber);
        data.append("city",city);
        data.append("pinCode", pinCode),
        data.append("address",address);

        if(formData.profile){
            data.append("profile",formData.profile)
        }

        data.append(
            'coordinates',
            JSON.stringify(formData.coordinates)
        );

        const response=await api.post(endpoints.CREATE_PROFILE,data)

        return response.data

    }
}