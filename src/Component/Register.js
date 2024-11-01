import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();

    const [ firstName, setFirstName] = useState("")
    const [ lastName, setLastName] = useState("")
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ repassword, setRepassword ] = useState("")

    const handleRegister = async (e)  => {
        e.preventDefault();
        console.log("Register")



        try{
            const response = await fetch("http://localhost:5000/register",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({firstName, lastName, email, password, repassword})
            })

            if(response.ok){
                const data = await response.json()
                console.log("Data from Server: ", data.message)
                alert(data.message)
                if(data.message === "Register Successful"){
                    navigate("/dashboard");
                }
            }
        }
        catch (error){
            console.log("Error", error)
        }


        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRepassword("");

    }

    return (
        <div>
            <div className="flex justify-center items-center h-screen flex-col">
                <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg max-w-2xl text-center">
                    <h1 className="text-3xl font-bold">Register</h1>
                    <div className="flex flex-row">
                        <h3>First Name</h3>
                        <h3>Last Name</h3>
                    </div>
                    <div className="flex flex-row h-12 text-2xl space-x-1">
                        <input className="border-2 pl-2 w-[15rem]" value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}/>
                        <input className="border-2 pl-2 w-[15rem]" value={lastName}
                               onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <h3>Email</h3>
                    <input className="w-[30rem] h-12 border-2 pl-2" type="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <h3>Password</h3>
                    <input className="w-[30rem] h-12 border-2 pl-2" type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <h3>Re-Password</h3>
                    <input className="w-[30rem] h-12 border-2 pl-2" type="password" value={repassword}
                           onChange={(e) => setRepassword(e.target.value)}/>
                    <div>
                        <button className="mt-5 border-2 rounded-full bg-blue-400 w-[5rem] h-10" onClick={handleRegister}>Register</button>
                    </div>

                </div>
            </div>
        </div>
    );
}