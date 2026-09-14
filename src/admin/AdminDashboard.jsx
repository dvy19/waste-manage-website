import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../api/socket";
import { adminService } from "../services/adminService";

function AdminDashboard() {

    const { id } = useParams();
    const [itemRequests, setItemRequests] = useState([]);

    const getItems=async()=>{

        try{
            const items=await adminService.getItems()

            console.log(items)
            setItemRequests(items.items)
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

                    <div className="item-card" key={item._id}>

                        <div className="item-card-header">

                            <div>
                                <h3>{item.name}</h3>

                                <span className="status">
                                    {item.status}
                                </span>
                            </div>

                            <span className="tracking-id">
                                {item.trackingId}
                            </span>

                        </div>


                        <div className="item-details">

                            <div>
                                <p>Category</p>
                                <strong>{item.category}</strong>
                            </div>

                            <div>
                                <p>Quantity</p>
                                <strong>{item.quantity}</strong>
                            </div>

                            <div>
                                <p>Weight</p>
                                <strong>{item.weight} kg</strong>
                            </div>

                        </div>


                        <div className="item-card-footer">

                            <span>
                                {new Date(item.createdAt).toLocaleString()}
                            </span>

                            <button>
                                View Request
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default AdminDashboard;