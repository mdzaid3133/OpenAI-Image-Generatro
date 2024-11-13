import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Navbar() {

    const [storedUser, setStoredUser] = useState(null);

    useEffect(() => {
        // Get user from localStorage on component mount
        const user = JSON.parse(localStorage.getItem("user"));
        setStoredUser(user);

        // Listen to storage changes to update the state when user data is removed
        const handleStorageChange = () => {
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            setStoredUser(updatedUser);
        };

        window.addEventListener("storage", handleStorageChange);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <nav className=" absolute block  md:px-8 px-4 py-2   text-white  w-full bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0
 ">
            <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                <a href="#" className="mr-4 block cursor-pointer py-1.5 text-white font-bold text-2xl">
                    Zarch Ai
                </a>

                <div className='flex items-center gap-2'>
                    <div>
                        <Link to={storedUser ? '/create' : '/signup'}>
                            <button className=' text-white px-4 py-1 font-semibold bg-blue-700 rounded-full'>Generate</button>
                        </Link>
                    </div>


                    {
                        storedUser && (
                            <Link to={`/u/${storedUser?.username}/profile`}>
                                <div className='w-9 h-9  cursor-pointer rounded-full bg-blue-700 overflow-hidden flex items-center justify-center'>

                                    <span className='text-xl text-white'>{storedUser.username.slice(0, 1).toUpperCase()}</span>

                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar



