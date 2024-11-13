import { jwtDecode } from "jwt-decode";
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tokenTime, setTokenTime ] = useState("")
    const [ isAdd, setIsAdd ] = useState(false);
    const [isDashboard, setIsDashboard] = useState(false);
    const [isStairSelected, setIsStairSelected] = useState(false);
    const [isFullFundSelected, setIsFullFundSelected] = useState(false);
    const [formData, setFormData] = useState({
        houseName: '',
        groupName: '',
        principalAmount: '',
        handsReceived: '',
        totalHands: '',
        days: '',
        perHandAmount: '',
        handsDeducted: '',
        handsSent: '',
        maintenanceFee: '',
        startDate: '',
        email: ''
    });


    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // console.log(token);



    useEffect(() => {
        async function fetchMyAPI() {
            if (token) {
                const decoded = jwtDecode(token);
                setEmail(decoded["sub"]); // Update state only when token is present
                const currentTime = Date.now() / 1000; // Current time in seconds
                if (decoded.exp < currentTime) {
                    console.log("Token has expired");
                    // Handle token expiration here, e.g., redirect to login or request a new token
                    localStorage.removeItem('token');
                    navigate("/login");
                }

                try {
                    const response = await axios.get(`http://localhost:5000/getname/${decoded["sub"]}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log('Dashboard data:', response.data);
                    setName(response.data.name);
                    console.log("Name is: ", response.data.name);
                } catch (error) {
                    console.error('Error fetching dashboard data:', error);
                }
            } else {
                console.log("No token found");
            }
        }

        fetchMyAPI();
    }, [token]);  // Runs effect only when `token` changes



    const handleAdd = () => {
        setIsAdd(true);
        setIsDashboard(false); // Hide the dashboard page when showing the add page
    }

    const handleDashboard = () => {
        setIsDashboard(true);
        setIsAdd(false); // Hide the add page when showing the dashboard page
    }

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        console.log("Selected group type:", selectedValue);
        // Add any additional logic you need here
        if(selectedValue === "วงขั้นบรรได"){
            setIsStairSelected(true);
            setIsFullFundSelected(false);
        }else if(selectedValue === "วงปิดต้น"){
            setIsFullFundSelected(true);
            setIsStairSelected(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddGroup = async (e) => {
        e.preventDefault();
        // Add logic to handle form submission
        console.log(formData.houseName);
        try {
            formData.email = email;
            const response = await axios.post("http://localhost:5000/addStairGroup", formData, {
                headers: { Authorization: `Bearer ${token}` }
            }
        )} catch (e) {
            console.log("Error during post data")
        }
    };


    return (
        <div className="flex h-screen">
            <div className="flex h-screen w-[15rem] flex-col justify-start bg-gray-200  text-center shadow-lg ">
                {/*left*/}
                <div className="flex flex-row py-4 justify-start space-x-3   bg-gray-400 align-middle pl-2">
                    <svg className=" w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                              d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                              clip-rule="evenodd"/>
                    </svg>
                    <a className="pt-1 text-black">{name}</a>
                </div>
                <div className=" flex flex-col ">
                    {/*<a href="#" className="py-3 hover:bg-gray-300">Dashboard</a>*/}
                    {/*<a href="#" className=" py-3 hover:bg-gray-300">Add</a>*/}
                    <button className="py-3 hover:bg-gray-300 " onClick={handleDashboard}>Dashboard</button>
                    <button className="py-3 hover:bg-gray-300" onClick={handleAdd}>Add</button>
                </div>
            </div>

            <div className="flex-1 ">
                {/* Dashboard Page */}
                {isDashboard && (
                    <div key="dashboard" className="bg-gray-300 text-black text-center font-bold text-xl py-[1.4rem]">
                        <h1>Dashboard Page</h1>
                    </div>
                )}

                {/* Add Page */}
                {isAdd && (
                    <div key="add" className="">
                        <div className="bg-gray-300 text-black text-center font-bold text-xl py-[1.4rem]">
                            <h1>เพิ่มวง</h1>
                        </div>
                        <div className="flex justify-start">
                            <div className="">
                                <form className=" space-x-2">
                                    <label>Group Type:
                                    <select className="border border-4 py-1 px-1 focus:outline-none focus:shadow-outline rounded shadow" onChange={(e) => handleSelectChange(e)}>
                                        <option>--เลือกวง--</option>
                                        <option>วงขั้นบรรได</option>
                                        <option>วงปิดต้น</option>
                                    </select>
                                    </label>
                                </form>
                            </div>
                            {isStairSelected && <div>
                                <div>
                                    <form onSubmit={handleAddGroup}>
                                        <label>ชื่อบ้าน
                                            <input
                                                className="border border-2"
                                                name="houseName"
                                                value={formData.houseName}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>ชื่อวง
                                            <input
                                                className="border border-2"
                                                name="groupName"
                                                value={formData.groupName}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>เงินต้น
                                            <input
                                                className="border border-2"
                                                name="principalAmount"
                                                value={formData.principalAmount}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>มือที่ได้
                                            <input
                                                className="border border-2"
                                                name="handsReceived"
                                                value={formData.handsReceived}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>มือทั้งหมด
                                            <input
                                                className="border border-2"
                                                name="totalHands"
                                                value={formData.totalHands}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>จำนวนวัน
                                            <input
                                                className="border border-2"
                                                name="days"
                                                value={formData.days}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>ส่งมือละ
                                            <input
                                                className="border border-2"
                                                name="perHandAmount"
                                                value={formData.perHandAmount}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>หักรับกี่มือ
                                            <input
                                                className="border border-2"
                                                name="handsDeducted"
                                                value={formData.handsDeducted}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>มือที่ส่งแล้ว
                                            <input
                                                className="border border-2"
                                                name="handsSent"
                                                value={formData.handsSent}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>ค่าดูแล
                                            <input
                                                className="border border-2"
                                                name="maintenanceFee"
                                                value={formData.maintenanceFee}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>วันที่เริ่ม
                                            <input
                                                className="border border-2"
                                                name="startDate"
                                                type="date"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <button className="border border-2">Submit</button>
                                    </form>
                                </div>
                            </div>}

                            {isFullFundSelected && <div>
                                <h2>Hello 2</h2>
                            </div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}