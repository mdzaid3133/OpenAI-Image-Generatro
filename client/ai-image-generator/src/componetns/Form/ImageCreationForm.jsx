import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MdOutlineUpdateDisabled } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ImageCreationForm({ post, setPost, setLoading }) {
    const [error, setError] = useState("");
    const [isLoadingSpiner, setIsLoadingSpiner] = useState(null);


    const navigate = useNavigate();

    const imageGenerator = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/api/generateimage', { prompt: post.prompt },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            setPost((prevPost) => ({
                ...prevPost,
                photo: response?.data?.photo || "",
            }));
            console.log("Generated photo URL:", response?.data?.photo);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Failed to generate image. Please try again.");
            console.error("Image Generation Error:", error);
        }
    };

    const postImage = async () => {

        try {
            setIsLoadingSpiner(true)
            const formData = new FormData();
            formData.append('name', post.name);
            formData.append('prompt', post.prompt);
            formData.append('photo', post.photo);


            const response = await axios.post('http://localhost:8000/api/post', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.success) {
                setIsLoadingSpiner(false)
            }

             console.log(response?.data?.post);
            // window.location.reload()
            navigate("/");
        } catch (error) {

            console.error("Error posting image:", error);
            setError("Failed to post image. Please ensure all fields are complete and try again.");
        }
    };


    return (
        <div className="w-full md:w-1/2 bg-[#09090b] p-8 rounded-lg shadow-lg border">
            <h2 className="text-2xl font-semibold mb-4 text-center">Generate Image with Prompt</h2>
            <p className="text-center mb-6">Write your prompt according to the image you want to generate!</p>

            {/* Author Input */}
            <div className="mb-4">
                <label htmlFor="author" className="block text-sm font-medium text-gray-300">Author</label>
                <input
                    onChange={(e) => setPost({ ...post, name: e.target.value })}
                    type="text"
                    id="author"
                    placeholder="Enter your name"
                    value={post.name}
                    name="name"
                    className="mt-1 p-3 w-full bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                />
            </div>

            {/* Image Prompt Input */}
            <div className="mb-6">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-300">Image Prompt</label>
                <textarea
                    value={post.prompt}
                    onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                    name='prompt'
                    id="prompt"
                    placeholder="Write a detailed prompt about the image"
                    rows="4"
                    className="mt-1 p-3 w-full bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                ></textarea>
                <p className="text-xs text-gray-400 mt-1">* You can post the AI Generated Image to showcase in the community!</p>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {/* Buttons */}
            <div className="flex justify-center items-center gap-4">

                <button
                    disabled={post.name && post.prompt ? false : true}
                    onClick={(e) => {
                        e.preventDefault();
                        imageGenerator();
                    }}
                    className={`
                    ${post.name && post.prompt ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-blue-300 cursor-not-allowed"}
                     flex items-center justify-center px-4 py-2   text-white font-semibold transition duration-300 rounded-full `}>
                    {
                        post.name && post.prompt ? "Generate Image" : <div className='flex items-center gap-1'>Generate Image {<MdOutlineUpdateDisabled />}</div>
                    }
                </button>

                <button
                    onClick={postImage}
                    disabled={post.photo ? false : true}
                    className={`flex items-center justify-center px-4 py-2 font-semibold transition duration-300 rounded-full ${post.photo ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-blue-300 cursor-not-allowed"}
                        } text-white`}
                >
                    {
                        post.photo ? "Post Image" : <div className='flex items-center gap-1'>Post Image{<MdOutlineUpdateDisabled />}</div>
                    }

                </button>

                {
                    isLoadingSpiner && (
                        <div>
                            <AiOutlineLoading3Quarters
                                className='animate-spin'
                            />

                        </div>
                    )
                }


            </div>
        </div>
    );
}

export default ImageCreationForm;
