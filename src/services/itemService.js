import { endpoints } from "../api/endpoints"
import api from "../api/axios"

export const itemService={

    getUserItems:async()=>{

        const items=await api.get(endpoints.GET_USER_ITEMS)

        return items.data

    },
}