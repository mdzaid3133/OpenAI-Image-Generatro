import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ImageCard from '../componetns/ImageCard';
import { IoIosArrowDropleft } from "react-icons/io";
import PopupForm from '../componetns/FormPopup';


function Profile() {
    const [storedUser, setStoredUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [filterPosts, setFilterPosts] = useState([]);
    const navigate = useNavigate();
   
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


  
    useEffect(() => {
        // Get user from localStorage on component mount
        const posts = JSON.parse(localStorage.getItem("posts"));
        setPosts(posts);
    
        // Listen to storage changes to update the state when user data is removed
        const handleStorageChange = () => {
            const updatedPost = JSON.parse(localStorage.getItem("posts"));
            setPosts(updatedPost);
        };
    
        window.addEventListener("storage", handleStorageChange);
    
        // Cleanup event listener on component unmount
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        if (storedUser) {
            const userPosts = posts.filter(post => post?.createdBy === storedUser._id);
            setFilterPosts(userPosts);
        }
    }, [posts, storedUser]);
    
    const joinData = new Date(storedUser?.createdAt);
    const year = joinData.getFullYear();
    const month = joinData.getMonth() + 1;

    const logout = async () => {
        await axios.get('http://localhost:8000/api/user/logout',{
          withCredentials: true,
        });
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        navigate("/");
    };


     const [IsOpen, setIsOpen] = useState(false);

      const togglePopup = () => {
        setIsOpen(!IsOpen);
      };


    return (
        <div className='bg-[#09090b] text-white min-h-screen'>
            <div className='md:px-10 px-5 py-5'>
                <Link to={'/'} className='text-3xl text-white  cursor-pointer'>
                    <IoIosArrowDropleft />
                </Link>
            </div>
            <div className='flex justify-between items-start md:w-1/2 w-full m-auto md:pt-30 pt-10 px-5 pb-8'>
                <div className='flex flex-wrap gap-4 items-start'>
                    <div className='w-20 h-20 rounded-full bg-blue-700 overflow-hidden flex items-center justify-center'>
                        {storedUser ? (
                            <span className='text-3xl'>{storedUser.username.slice(0, 1).toUpperCase()}</span>
                        ) : (
                            <img
                                className='w-20 h-20'
                                src='https://microbiology.ucr.edu/sites/g/files/rcwecm2866/files/styles/form_preview/public/blank-profile-pic.png?itok=xMM7pLfb'
                                alt='Profile Pic'
                            />
                        )}
                    </div>
                    <div className='space-y-3'>
                        <div className='md:text-3xl text-xl font-bold'>{storedUser?.username}</div>
                        <div className='font-semibold'>{storedUser?.email}</div>
                        <div className='font-semibold'>Joined - {month} - {year}</div>
                    </div>
                </div>
                <div>
                    <div className='flex gap-2'>
                        <button 
                         onClick={()=> togglePopup()}
                        className='bg-gray-800 hover:bg-gray-700 transition-all ease-in px-3 py-1 rounded-full text-white text-nowrap'>
                            Edit profile
                        </button>
                        <button
                            onClick={logout}
                            className='bg-gray-800 hover:bg-gray-700 transition-all ease-in px-3 py-1 rounded-full text-white text-nowrap'
                        >
                            Logout
                        </button>
                    </div>
                    {IsOpen && (
                        <PopupForm
                            user={storedUser}
                            IsOpne={IsOpen}
                            setIsOpen={setIsOpen}
                            storedUser={storedUser}
                        />)
                    }
                </div>
            </div>

            <hr />

            <div className="container mx-auto p-4">
                {filterPosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filterPosts.map((item) => (
                            <div
                                key={item._id}
                                className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <ImageCard item={item} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-sm text-white">No generation yet.</div>
                )}
            </div>
        </div>
    );
}

export default Profile;
