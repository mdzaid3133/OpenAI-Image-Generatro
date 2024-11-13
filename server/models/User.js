import mongoose from "mongoose";
import bcrypt  from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8, 
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Reference the Post model
  }],

}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;
