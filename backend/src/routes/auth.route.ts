import express from "express";
import { registerUser, loginUser, logoutUser,getMe } from "../controllers/user.controller";
import { verifyUser } from "../middleware/user.middleware";

const router = express.Router();

  
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",verifyUser,logoutUser);
router.get("/getMe",verifyUser,getMe);
// router.get('/check-token', verifyUser, (req, res) => {
//   const timeLeft = req.user.sessionTokenExpiry -new Date();
//   console.log("timeLeft",timeLeft)
//   res.json({
//     expiresIn: `${Math.round(timeLeft/60000)} minutes`,
//     expiresAt: req.user.sessionTokenExpiry
//   });
// });

export default router;