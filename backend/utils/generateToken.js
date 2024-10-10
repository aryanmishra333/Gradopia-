// backend/utils/generateToken.js
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevent XSS
        sameSite: "strict", // Prevent CSRF
        secure: process.env.NODE_ENV !== "development", // Only set to true in production
    });
};

export default generateTokenAndSetCookie;