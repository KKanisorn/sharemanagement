import { jwtDecode } from "jwt-decode";
import {useEffect, useState} from "react";


export default function Dashboard() {
    const [name, setName] = useState("");
    const [tokenTime, setTokenTime ] = useState("")
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            console.log("Decoded token:", decoded);
            setName(decoded["sub"]); // Update state only when token is present
            setTokenTime(["iat"])
        } else {
            console.log("No token found");
        }
    }, [token]); // Runs effect only when `token` changes



    return (
        <div>
            <div className="flex h-screen w-[15rem] flex flex-col justify-start bg-gray-200  text-center shadow-lg ">
                {/*left*/}
                <div className="flex flex-row py-4 justify-start space-x-3">
                    <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                              d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                              clip-rule="evenodd"/>
                    </svg>
                    <a className="border bg-gray-300">Kanisorn Khetkhuean</a>
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