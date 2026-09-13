 
 export const endpoints={

    REGISTER:"user/register",
    LOGIN:"user/login",

    CREATE_PROFILE:"user/create-profile",

    REUSE_ITEMS:"item/analyze-waste",
    CREATE_ITEM:"item/create-item",

    USER_STATS:"item/get-user-stats",

    GET_USER_PROF:'user/get-profile',

    TRACK_ITEM:(trackingId)=>`item/get-item-id/${trackingId}`,

    GET_USER_ITEMS:"item/get-user-items",



 }