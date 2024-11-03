import { jwtDecode } from "jwt-decode";
import {useEffect, useState} from "react";


export default function Dashboard() {
    const [name, setName] = useState("");
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            console.log("Decoded token:", decoded);
            setName(decoded["sub"]); // Update state only when token is present
        } else {
            console.log("No token found");
        }
    }, [token]); // Runs effect only when `token` changes



    return (
        <div>
            <div className="flex h-screen w-[15rem] flex flex-col justify-start bg-gray-200  text-center shadow-lg ">
                {/*left*/}
                <div className="flex flex-col">
                    <a className="border py-5 bg-gray-300">{name}</a>
                </div>
                <div className=" flex flex-col ">
                    <a href="#" className="border py-3 hover:bg-gray-300">Dashboard</a>
                    <a href="#" className="border border-2 py-3 hover:bg-gray-300">Add</a>
                </div>
            </div>

            <div>
                {/*right*/}
            </div>
        </div>
    );
}