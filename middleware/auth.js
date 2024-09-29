import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import Logincol from "../src/model/db.js";

const auth = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.render("loginagain", { message: "Unauthorized access! Please login." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Logincol.findById(verified.id); // Fetch user by ID
        next(); 
    } catch (error) {
        res.render("loginagain", { message: "Invalid or expired token." });
    }
};

export default auth;
