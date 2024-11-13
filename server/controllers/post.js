import Post from '../models/post.js';
import { v2 as cloudinary } from 'cloudinary'
import User from '../models/User.js';

const getAllPosts = async(req,res,next)=>{
     try {
        const posts = await Post.find({});

         if(!posts){
             return res.status(404).json({message:'No posts found'})
         }

        res.status(200).json({
            succcess: true,
            message: 'Posts found successfully',
            posts: posts
        })
     } catch (error) {
         console.error(error.message);
         res.status(500).json({message:'Server Error'})
     }

}

//create a new post
const createPost = async (req, res) => {
  try {
    
    const { name, prompt,photo } = req.body;
     const userId = req.user.id;

      console.log("myuserid", userId);

    // Validate required fields
    if (!name || !prompt ||!photo ) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Check if photo is base64 encoded, then upload to Cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: 'post_images', // Optional folder for organizing uploads
    });

    // Confirm the upload was successful
    if (!photoUrl || !photoUrl.secure_url) {
      return res.status(500).json({ message: 'Failed to upload image to Cloudinary.' });
    }

    // Create a new post with the Cloudinary URL
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
      createdBy: userId
    });

    await User.findByIdAndUpdate(userId, {$push: {posts:newPost._id}});

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (error) {
    console.error('Error details:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


export {getAllPosts,createPost} 