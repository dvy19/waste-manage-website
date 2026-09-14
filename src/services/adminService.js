import api from '../api/axios';
import { endpoints } from '../api/endpoints'
 

export const adminService={


    createCentre:async(formData)=>{

        const data=new FormData();


        data.append("city" , formData.city),
        data.append("contact" , formData.contact),
        data.append("owner", formData.owner),
        data.append("pinCode" , formData.pinCode),
        data.append("address" , formData.address);

        data.append("material" , formData.material);


        
        if(formData.profile){
            console.log(formData.profile)
            data.append("image",formData.profile)
        }

        data.append(
            'coordinates',
            JSON.stringify(formData.coordinates)
        );


        const centre=await api.post(endpoints.CREATE_CENTRE , data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return centre.data
    },

    getAllCentres:async()=>{

        const centres=await api.get(endpoints.GET_ALL_CENTRE)
        return centres.data
    },

    getSingleCentre:async(id)=>{

        const centre=await api.get(`${endpoints.GET_SINGLE_CENTRE(id)}`)

        return centre.data
    },


    createSalesItem:async(formData)=>{

        const data=new FormData()

        data.append("name" , formData.name);
        data.append("price",formData.price)
        data.append("quantity",formData.quantity),
        data.append("manufacturer",formData.manufacturer)
        data.append("materials" , formData.materials)
        data.append("about" , formData.about)


        if(formData.image){
            data.append("image" , formData.image)
        }

        const item=await api.post(endpoints.CREATE_SALES_ITEM , data , 
            {
                 headers: {
                "Content-Type": "multipart/form-data"
                    }
            }
        )

        return item.data
    },


    getSalesItems:async()=>{

        const items=await api.get(endpoints.GET_SALES_ITEMS)

        return items.data
    },



    getAllReqItems:async()=>{

        const items=await api.get(endpoints.GET_ALL_ITEMS)

        return items.data
    }


}