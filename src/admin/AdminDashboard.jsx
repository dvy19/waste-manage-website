import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../api/socket";
import { adminService } from "../services/adminService";

import ItemCard from "../component/ItemCard";

function AdminDashboard() {

    const { id } = useParams();
    const [itemRequests, setItemRequests] = useState([]);

    const getItems=async()=>{

        try{
            const items=await adminService.getAllReqItems()

            console.log(items)
            setItemRequests(items.item)
        }
        catch(err){
            console.log(`${err}`)
        }
    }

    useEffect(() => {

        getItems()

        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);

            socket.emit("joinAdminRoom", id);
            console.log("➡️ Joined admin room:", `admin_${id}`);
        });

        socket.on("newItemRequest", (data) => {

            console.log("🔔 New item request received");
            console.log(data);

            setItemRequests((prev) => [
                ...prev,
                data.item
            ]);
        });

        return () => {
            socket.off("connect");
            socket.off("newItemRequest");
        };

    }, [id]);

    return (
        <div className="admin-dashboard">

            <h1>Admin Dashboard</h1>

            <div className="requests-container">

                {itemRequests.map((item) => (

                    <ItemCard item={item}/>

                

                ))}

            </div>

        </div>
    );
}

export default AdminDashboard;