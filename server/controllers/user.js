import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../middleware/GenerateToken.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  httpOnly: true,
  secure: true,
  sameSite: 'None', 
}

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    console.log(username, email, password);

    // Validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password:hashedPassword
    });

    // Remove password from the response for security
    newUser.password = undefined;

    // Send success response
    res.status(201).json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    console.log(user)

     const isMatch = await bcrypt.compare(password,user.password);
     console.log(isMatch)
    if (!user || !isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

     console.log('token: ' + token);
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User login successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const logout = (req, res) => {
  console.log('Cookies before logout:', req.cookies);
  res.cookie('token', null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
    path: '/',
  });
  console.log('Cookies after logout:', req.cookies);

  res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
};

export const updateProfile = async(req,res,next)=>{
  try {
    const { username, email, } = req.body;
    
    if (!username ||!email) {
      return res.status(400).json({ message: "Username and email are required" });
    }
   
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,  
      { username, email},
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
}