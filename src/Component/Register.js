import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();

    const [ firstName, setFirstName] = useState("")
    const [ lastName, setLastName] = useState("")
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ repassword, setRepassword ] = useState("")

    const handleRegister = async (e)  => {
        e.preventDefault();
        if (password !== repassword) {
            alert("Passwords do not match!");
            return; // Stop the registration if passwords don't match
        }
        else if(firstName === "" || lastName === "" || email ==="" || password === "" || repassword === ""){
            alert("Some of the input box is empty");
        }
        else{
            try{
                const response = await axios.post("http://localhost:5000/register", {
                    firstName,
                    lastName,
                    email,
                    password,
                    repassword
                });

                const data = response.data
                console.log("Data from Server: ", data.message)
                alert(data.message)
                if(data.message === "Register Successful"){
                    navigate("/dashboard");

                }
            }
            catch (error){
                console.log("Error", error)
            }
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
                <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg max-w-2xl">
                    <h1 className="text-3xl font-bold text-center">Register</h1>
                    <div className="flex flex-row mt-5 font-bold">
                        <h3>First Name:</h3>
                        <h3 className="ml-[10rem]">Last Name:</h3>
                    </div>
                    <div className="flex flex-row h-12 text-2xl space-x-1">
                        <input className="border-2 pl-2 w-[15rem]" value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}/>
                        <input className="border-2 pl-2 w-[15rem]" value={lastName}
                               onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <h3 className="font-bold">Email</h3>
                    <input className="text-2xl w-[30rem] h-12 border-2 pl-2" type="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <h3 className="font-bold">Password</h3>
                    <input className="text-2xl w-[30rem] h-12 border-2 pl-2" type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <h3 className="font-bold">Re-Password</h3>
                    <input className="text-2xl w-[30rem] h-12 border-2 pl-2" type="password" value={repassword}
                           onChange={(e) => setRepassword(e.target.value)}/>
                    <div className="text-center">
                        <button className="mt-5 border-2 rounded-full bg-blue-400 w-[5rem] h-10" onClick={handleRegister}>Register</button>
                    </div>

                </div>
            </div>
        </div>
    );
}