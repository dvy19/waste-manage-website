 
 export const endpoints={

    REGISTER:"user/register",
    LOGIN:"user/login",

    CREATE_PROFILE:"user/create-profile",
    GET_PROFILE:"user/get-profile",

    REUSE_ITEMS:"item/analyze-waste",
    CREATE_ITEM:"item/create-item",

    USER_STATS:"item/get-user-stats",

    GET_USER_PROF:'user/get-profile',

    TRACK_ITEM:(trackingId)=>`item/get-item-id/${trackingId}`,

    GET_USER_ITEMS:"item/get-user-items",


    CREATE_CENTRE:'admin/create-centre',

    GET_ALL_CENTRE:'admin/get-centres',
    GET_SINGLE_CENTRE:(id)=>`admin/get-single-centre/${id}`



 }