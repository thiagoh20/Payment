import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";
export const generateToken = (payload) => {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "20d" });
};
export const generateTokenWithOutExpiration = (payload) => {
    return jwt.sign(payload, TOKEN_SECRET);
};
