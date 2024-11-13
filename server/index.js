import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cloudinary from 'cloudinary'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
//imports routes here
import postRouter from './routes/post.js'
import generaeImageRouter from './routes/GenerateAiImage.js'
import userRouter from './routes/User.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
}))
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.use(cookieParser());



app.options('/api/post', cors());

//cloudinary configuration here 
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});



//mongoose configuration
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));



//routes
app.use('/api/post',postRouter);
app.use('/api/generateimage',generaeImageRouter);
app.use('/api/user',userRouter);

//test api
app.get('/', (req,res,next)=>{
    res.json({message:'API is working'})
})


//error handling middleware here
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

//server listning services
app.listen(PORT, ()=>(
    console.log(`Server running on port ${PORT}`)
))

