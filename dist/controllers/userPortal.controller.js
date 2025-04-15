var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { generateToken, generateTokenWithOutExpiration } from "../lib/jwt.js";
import { userPortalService } from "../services/userPortal.service.js";
export class userPortalController {
    static registerUserPortal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const userRegister = yield userPortalService.register(data);
                const userData = userRegister.toJSON();
                const token = generateToken({
                    id: userData.id_user_portal,
                    email: userData.user_email,
                    phone: userData.user_phone,
                    rol: userData.rol,
                });
                res.cookie("token", token);
                return res.status(200).json({
                    user_name: userRegister.toJSON().user_name,
                    rol: userRegister.toJSON().rol,
                    token: token,
                    message: "Usuario registrado correctamente",
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ message: "Error al registrar el usuario", error });
            }
        });
    }
    static loginUserPortal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*   const data: IUserPortal = req.body; */
            const user = req.body.user;
            // console.log(user);
            try {
                const token = generateToken({
                    id: user.id_user_portal,
                    email: user.user_email,
                    phone: user.user_phone,
                    rol: user.rol,
                });
                res.cookie("token", token);
                return res.status(200).json({
                    user_name: user.user_name,
                    rol: user.rol,
                    token: token,
                    message: "Usuario logueado correctamente",
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ message: "Error al iniciar sesión", error });
            }
        });
    }
    static logoutUserPortal(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("token");
                return res.status(200).json({
                    message: "Usuario deslogeado correctamente",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Error al cerrar sesión", error });
            }
        });
    }
    static generateTokenValidate(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = generateTokenWithOutExpiration({
                    validate: true,
                });
                return res.status(200).json({ token });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ message: "Error al generar el token", error });
            }
        });
    }
}
