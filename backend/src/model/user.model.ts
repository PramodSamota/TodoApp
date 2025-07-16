import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export interface UserInterface extends Document {
    name: string;
    email: string;  
    password: string;  
    sessionToken: string | null;
    sessionTokenExpiry: Date | null;
    generateToken: () => {
        unHashedToken: string;
        hashedToken: string;
        tokenExpiry: Date;  // Changed from Date to number since you're returning a timestamp
    }; 
}

const userSchema = new mongoose.Schema<UserInterface>({
    name: {
        type: String,
        required: true,  
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    password: {
        type: String,
        required: true,
    },
    sessionToken: {
        type: String,
    },
    sessionTokenExpiry: {
        type: Date,
    }
}, {
    timestamps: true
});

// 1. Add methods BEFORE creating the model
userSchema.methods.generateToken = function() {
    const unHashedToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); 
    
    return { unHashedToken, hashedToken, tokenExpiry }; 
};


// 2. Add pre-save hook
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isTokenValid = function() {
    return this.sessionTokenExpiry > new Date();
};
// 3. Create the model AFTER all schema modifications
export const User = mongoose.model<UserInterface>("User", userSchema);