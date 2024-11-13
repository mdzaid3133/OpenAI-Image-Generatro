import jwt from "jsonwebtoken";

export const isLoggedIn = (req,res,next)=>{
   try {
    const { token } = req.cookies;
    console.log("myToken: " + token)

     if(!token){
        return res.status(401).json({ success: false, message: 'Unauthenticated, please login again' });
    }
    
    const userDetails = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next();
} catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired, please login again' });
        
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Invalid token, please login again' });
      } else {
        return res.status(401).json({ success: false, message: 'Authentication error, please try again' });
      }
   }
}