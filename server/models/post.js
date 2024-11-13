import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
}, {
    timestamps: true
});


 const Post = mongoose.model('Post', PostSchema);

 export default Post;