import { endpoints } from "../api/endpoints"
import api from "../api/axios"

export const itemService={

    getUserItems:async()=>{

        const items=await api.get(endpoints.GET_USER_ITEMS)

        return items.data

    },

    createItem:async(newItemData)=>{

        const data=new FormData();

        data.append("name" , newItemData.name)
        data.append("quantity" , newItemData.quantity)
        data.append("weight" , newItemData.weight)
        data.append("category" , newItemData.category)


        if(newItemData.image){
            data.append("image" , newItemData.image)
        }

        const item=await api.post(endpoints.CREATE_ITEM, data, {
             headers: {
                "Content-Type": "multipart/form-data"
            }
        })


        return item.data



    },


    trackItem:async(trackingId)=>{

        const data=await api.post(`${endpoints.TRACK_ITEM(trackingId)}`)

        return data.data
    }
}