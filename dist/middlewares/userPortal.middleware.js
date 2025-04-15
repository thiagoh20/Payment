var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcryptjs";
import { userPortalService } from "../services/userPortal.service.js";
import { TOKEN_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
export class userPortalMiddleware {
    static hashPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_password } = req.body;
                const hashedPassword = yield bcrypt.hash(user_password, 10);
                req.body.user_password = hashedPassword;
                return next();
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static checkMailRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_email } = req.body;
                const emailExist = yield userPortalService.CheckEmailRegister(user_email);
                if (emailExist) {
                    return res
                        .status(400)
                        .json({ message: "El email ya se encuentra registrado" });
                }
                return next();
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Error al verificar el email" });
            }
        });
    }
    static checkMailLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_email } = req.body;
                // console.log(user_email);
                const emailExist = yield userPortalService.getUserByEmail(user_email);
                if (!emailExist) {
                    return res
                        .status(400)
                        .json({ message: "El usuario no esta registrado" });
                }
                return next();
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Error al verificar el email" });
            }
        });
    }
    static comparePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_email, user_password } = req.body;
                const user = yield userPortalService.getUserByEmail(user_email);
                if (!user) {
                    return res.status(400).json({ message: "El usuario no existe" });
                }
                const comparePassword = yield bcrypt.compare(user_password, user.user_password);
                if (!comparePassword) {
                    return res
                        .status(400)
                        .json({ message: "Email o contraseña incorrecta" });
                }
                req.body.user = user;
                return next();
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ message: "Error al comparar la contraseña" });
            }
        });
    }
    static verifyUserRol(allowedRoles) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = req.cookies.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
                if (!token) {
                    return res.status(401).json({ message: "No autorizado" });
                }
                const decoded = jwt.verify(token, TOKEN_SECRET);
                const userRol = decoded.rol;
                if (!allowedRoles.includes(userRol)) {
                    return res.status(403).json({ message: "Acceso denegado" });
                }
                next();
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Error al verificar el rol" });
            }
        });
    }
    static verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = req.cookies.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
                if (!token) {
                    return res.status(401).json({ message: "No autorizado" });
                }
                const decoded = jwt.verify(token, TOKEN_SECRET);
                req.body.user = decoded;
                next();
            }
            catch (error) {
                console.log(error);
                return res.status(401).json({ message: "Token no valido" });
            }
        });
    }
}
