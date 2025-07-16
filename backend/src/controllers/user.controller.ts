import { User } from "../model/user.model";
import { Request,Response } from "express";
import bcrypt from "bcryptjs";
import cookie from "cookie-parser";

const registerUser = async( req: Request,
  res: Response,) =>{
   const {name,email,password} = req.body;

   if(!name || !email || !password){
    return res.status(400).json({message:"All fields are required"});
   }
try {    
       const alreadyUser = await User.findOne({email});
       if(alreadyUser){
        return res.status(400).json({message:"User already exists"});
       }
    
       const user = await User.create({name,email,password});
       
       if(!user){
        console.log("user is not getting")
       }
        res.status(201).json({message:"User created successfully",data:user});
} catch (error) {
    console.log("error in registerUser",error);
    return res.status(400).json({message:"registertion is failed"});
}
}

const loginUser = async(req:Request,res:Response) =>{
    
   const {email, password} = req.body;
if (!password || !email) {
    return res.status(400).json({message: "All fields are required"});
}

try {
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({message: "User not found"});
    }

    // Compare plain password with stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);       
    if (!isPasswordCorrect) {  // Notice the ! operator here
        return res.status(400).json({message: "Password is incorrect"});
    }

    const {hashedToken, tokenExpiry, unHashedToken} = user.generateToken();  
    // console.log("tokenExpiry",tokenExpiry);           
    user.sessionToken = hashedToken;
    user.sessionTokenExpiry = tokenExpiry;        
    await user.save();  // Make sure to await the save operation

    // Cookie options
   const cookieOptions = {
    httpOnly: true,
    secure: true,
    expires: tokenExpiry
  };

    res.cookie("sessionToken", unHashedToken, cookieOptions)
       .status(200)
       .json({
           message: "User logged in successfully",
           data: user
       }); 

} catch (error) {
    console.log("error in loginUser", error);
    if (error instanceof Error) {
        return res.status(400).json({message: error.message});                                       
    }
    return res.status(500).json({message: "Internal server error"});
}
}

const logoutUser = async(req:Request,res:Response) =>{
    const userId = (req as any).user._id;
    // console.log("user",req.user);
  try {
     const user = await User.findById(userId);

     if(!user){
        console.log("user not found");
        return res.status(400).json({message:"User not found"});
     }
     
        user.sessionToken = null;
        user.sessionTokenExpiry = null;
        user.save();
        
         const cookieOption ={
            httpOnly:true,
            secure:true,
            maxAge:1000*60*60*60,                       
        }
        res.clearCookie("token", cookieOption)
         .status(200).json({message:"User logged out successfully"});
     
  } catch (error) {
    console.log("error in logoutUser",error);
  }
}

const getMe = async(req:Request,res:Response) =>{
    try {
    //     const userId = (req as any).user._id;
    //  const freshUser = await User.findById(userId)
    //   .select('-password -sessionToken -sessionTokenExpiry')
    //   .lean();

    // if (!freshUser) {
    //   return res.status(404).json({ 
    //     message: "User not found" 
    //   });
    // }

    const user = (req as any).user;
    res.status(200).json({
      success: true,
      user: user
    });
    
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ 
      message: "Failed to fetch user data" 
    });
}
}
export {registerUser,loginUser,logoutUser,getMe}