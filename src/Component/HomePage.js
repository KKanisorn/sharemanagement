import {Link} from "react-router-dom";


export default function HomePage() {
    return (
        <div className="overflow-hidden h-screen">
            <div className="font-bold flex justify-end space-x-5 bg-black text-white pt-3 pb-3 pr-10">
                <Link to="/">Home</Link>
                <Link to="#">About</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            <div className="bg-[#e5e5e5] text-black h-screen text-2xl flex items-center justify-center">
                <div className="bg-white text-gray-800 p-10 rounded-lg shadow-lg max-w-2xl text-center">
                    <h1 className="text-3xl font-semibold mb-4">
                        Welcome to Share Accounting
                    </h1>
                    <p className="text-lg leading-relaxed">
                        Where your financial growth and security are our top priorities. Whether you're a new investor
                        or looking to optimize an existing portfolio, Share provides tailored strategies to help you
                        achieve your financial goals.
                    </p>
                </div>
            </div>
        </div>
    );
}

