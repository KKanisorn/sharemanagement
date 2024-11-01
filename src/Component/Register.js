

export default function Register() {
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
                        <input className="border-2 pl-2 w-[15rem]"/>
                        <input className="border-2 pl-2 w-[15rem]"/>
                    </div>
                    <h3>Email</h3>
                    <input className="w-[30rem] h-12 border-2 pl-2"/>
                    <h3>Password</h3>
                    <input className="w-[30rem] h-12 border-2 pl-2"/>
                    <h3>Re-Password</h3>
                    <input className="w-[30rem] h-12 border-2 pl-2"/>
                    <div>
                        <button className="mt-5 border-2 rounded-full bg-blue-400 w-[5rem] h-10">Register</button>
                    </div>

                </div>
            </div>
        </div>
    );
}