import { Request, Response } from "express";
import { generateToken, generateTokenWithOutExpiration } from "../lib/jwt.js";
import { userPortalService } from "../services/userPortal.service.js";
import { IUserPortal } from "../interface/userPortal.interface.js";

export class userPortalController {
  static async registerUserPortal(req: Request, res: Response) {
    const data: IUserPortal = req.body;
    try {
      const userRegister = await userPortalService.register(data);
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
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error al registrar el usuario", error });
    }
  }

  static async loginUserPortal(req: Request, res: Response) {
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
    } catch (error: any) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error al iniciar sesión", error });
    }
  }

  static async logoutUserPortal(_req: Request, res: Response) {
    try {
      res.clearCookie("token");
      return res.status(200).json({
        message: "Usuario deslogeado correctamente",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error al cerrar sesión", error });
    }
  }

  static async generateTokenValidate(_req: Request, res: Response) {
    try {
      const token = generateTokenWithOutExpiration({
        validate: true,
      });
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error al generar el token", error });
    }
  }
}
