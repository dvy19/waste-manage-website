import axios from "axios";


const api = axios.create({
    baseURL: "https://waste-management-hiay.onrender.com/api/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true

});

export default api;
