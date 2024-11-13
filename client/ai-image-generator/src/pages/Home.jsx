import React, { useEffect, useState } from 'react';
import ImageCard from '../componetns/ImageCard';
import axios from 'axios';
import Navbar from '../componetns/Navbar';
import Footer from '../componetns/Footer';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Home() {
  const [posts, setPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);
  const [search, setSearch] = useState("");

  const getAllPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/post', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPosts(response.data?.posts);
      localStorage.setItem('posts', JSON.stringify(response?.data?.posts));
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

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
    
      getAllPosts();

  }, []);

  // Filter posts based on search input
  useEffect(() => {
    if (!search) {
      setFilterPosts(posts);
    } else {
      const filteredPosts = posts.filter((post) => {
        const promptMatch = post?.prompt?.toLowerCase().includes(search.toLowerCase());
        const authorMatch = post?.name?.toLowerCase().includes(search.toLowerCase());
        return promptMatch || authorMatch;
      });
      setFilterPosts(filteredPosts);
    }
  }, [posts, search]);

  return (
    <>
      <Navbar />
      <div className="bg-[#09090b] text-white">
        <div
          className="md:py-40 py-32 px-3"
          style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2023/03/15/20/46/background-7855413_1280.jpg')",
            backgroundPosition: 'center'
          }}
        >
          <div className="flex flex-col items-center text-center">
            <h1 className="md:text-4xl text-2xl font-bold text-white pb-3">Explore popular posts in the community!</h1>
            <p className="pb-10 font-semibold">Convert your text into an image within a second using this AI-powered Image Generator tool.</p>
            <div className="p-1 border md:w-[80vh] h-[50px] w-full rounded-full flex justify-between relative bg-white text-gray-800">
              <input
                type="text"
                placeholder="Search what you want to see"
                className="bg-transparent w-full px-3 outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          {
            posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filterPosts.slice().reverse().map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <ImageCard
                      item={item}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center flex items-center gap-2 justify-center">
                Fetching, please wait 
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            )
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
