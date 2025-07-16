import { Request, Response, NextFunction } from "express";
import { User } from "../model/user.model";
import crypto from "crypto";
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionToken } = req.cookies;
    // console.log("req",req);
    if (!sessionToken) {
      return res.status(401).json({ message: "Unauthorized - No session token provided" });
    }
    
    const hashedsessionToken = crypto.createHash('sha256').update(sessionToken).digest('hex');  
    // console.log("sessionToken",hashedsessionToken);

   const user = await User.findOne({
      sessionToken: hashedsessionToken,
      sessionTokenExpiry: { $gt: new Date() } // Check if token is not expired
    }).select('-password -sessionToken -sessionTokenExpiry');

    // console.log("sesseionTokenExpiry", user?.sessionTokenExpiry)
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - Invalid session token" });
    }

    // Attach the user object to the request
    (req as any).user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal server error during authentication" });
  }
};

export { verifyUser };