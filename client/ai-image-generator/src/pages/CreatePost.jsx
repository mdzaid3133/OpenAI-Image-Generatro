import React, { useState } from 'react'
import GeneratedImageCard from '../componetns/GeneratedImageCard';
import { FaPhotoVideo } from 'react-icons/fa';
import { IoIosArrowDropleft } from "react-icons/io";
import ImageCreationForm from '../componetns/Form/ImageCreationForm';
import { Link } from 'react-router-dom';

const createPost = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  })


  console.log(post)

  return (
    <>
      <div className='bg-black min-h-screen'>
      <div className='px-10 py-5'>
        <Link to={'/'} className='text-3xl text-white  cursor-pointer'>
        <IoIosArrowDropleft
         />
         </Link>
         </div>
        <div className="py-8 px-4 flex flex-wrap gap-5 items-center justify-center text-white ">
          <ImageCreationForm post={post} setPost={setPost} setLoading={setLoading} />

          <GeneratedImageCard post={post} loading={loading} />


        </div>
      </div>
    </>

  );
};

export default createPost;


