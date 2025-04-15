import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "20d" });
};

export const generateTokenWithOutExpiration = (payload: any) => {
  return jwt.sign(payload, TOKEN_SECRET);
}
