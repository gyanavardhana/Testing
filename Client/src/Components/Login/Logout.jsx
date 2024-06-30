import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}logout`, null, {
                withCredentials: true
            });
            if(response.status === 200) {
                navigate("/");
                console.log("Logged out successfully");
            }else{
                console.log("Error logging out");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;
