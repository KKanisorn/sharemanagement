import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login(){
    const navigate = useNavigate();

    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Email or Username:", emailOrUsername);
        console.log("Password:", password);

        try{
            const response = await axios.post('http://localhost:5000/login', {
                emailOrUsername,
                password
            });

            const data = response.data
            console.log("Data from Server: ", data.token)
            if (data.token) {
                localStorage.setItem('token', data.token); // Save JWT in local storage
                navigate("/dashboard");
            }



        } catch (error){
            console.log("Error", error)
        }

        setEmailOrUsername("");
        setPassword("")
    }

    return (
        <div className="overflow-hidden h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg max-w-2xl text-center">
                    <h1 className="text-3xl font-bold text-center">Login</h1>
                    <h3 className="mt-10 font-bold flex justify-start">Email or username:</h3>
                    <input className="w-[30rem] h-12 border-2 mt-1 rounded text-2xl pl-2 " value={emailOrUsername}
                           onChange={(e) => setEmailOrUsername(e.target.value)}/>
                    <h3 className=" mt-7 font-bold flex justify-start">Password:</h3>
                    <input className="w-[30rem] h-12 border-2 mt-1 text-2xl pl-2" value={password} type="password"
                           onChange={(e) => setPassword(e.target.value)}/>
                    <div>
                        <button className="mt-5 border-2  rounded-full bg-blue-400 w-[4.5rem] h-10"
                                onClick={handleSubmit}>Log in
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}