 
 export const endpoints={

    REGISTER:"user/register",
    LOGIN:"user/login",

    CREATE_PROFILE:"user/create-profile",
    GET_PROFILE:"user/get-profile",

    REUSE_ITEMS:"item/analyze-waste",
    CREATE_ITEM:"item/create-item",
    
    GET_ALL_ITEMS:"admin/get-items",

    USER_STATS:"item/get-user-stats",

    GET_USER_PROF:'user/get-profile',

    TRACK_ITEM:(trackingId)=>`item/get-item-id/${trackingId}`,

    GET_USER_ITEMS:"item/get-user-items",


    CREATE_CENTRE:'admin/create-centre',

    GET_ALL_CENTRE:'admin/get-centres',
    GET_SINGLE_CENTRE:(id)=>`admin/get-single-centre/${id}`,

    CREATE_SALES_ITEM:"admin/create-item",
    GET_SALES_ITEMS:"admin/get-sales-items",

    GET_SALES_ITEMS_BY_ID:(id)=>`admin/get-sales-item/${id}`,

    CREATE_COUPONS:"item/create-coupons",
    GET_USER_COUPONS:"item/get-user-coupons",

    CHECK_COUPONS:"item/check-coupon",

    CREATE_ORDER:"user/create-order",

    GET_USER_ORDERS:"user/get-user-orders"



 }