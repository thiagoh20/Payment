import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { userPortalService } from "../services/userPortal.service.js";
import { TOKEN_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
import { userRol } from "../interface/userPortal.interface.js";

export class userPortalMiddleware {
  static async hashPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_password } = req.body;
      const hashedPassword = await bcrypt.hash(user_password, 10);
      req.body.user_password = hashedPassword;
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  static async checkMailRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user_email } = req.body;
      const emailExist = await userPortalService.CheckEmailRegister(user_email);
      if (emailExist) {
        return res
          .status(400)
          .json({ message: "El email ya se encuentra registrado" });
      }

      return next();
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: "Error al verificar el email" });
    }
  }

  static async checkMailLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_email } = req.body;
      // console.log(user_email);
      const emailExist = await userPortalService.getUserByEmail(user_email);

      if (!emailExist) {
        return res
          .status(400)
          .json({ message: "El usuario no esta registrado" });
      }

      return next();
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: "Error al verificar el email" });
    }
  }

  static async comparePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user_email, user_password } = req.body;

      const user = await userPortalService.getUserByEmail(user_email);

      if (!user) {
        return res.status(400).json({ message: "El usuario no existe" });
      }

      const comparePassword = await bcrypt.compare(
        user_password,
        user.user_password
      );
      if (!comparePassword) {
        return res
          .status(400)
          .json({ message: "Email o contraseña incorrecta" });
      }

      req.body.user = user;
      return next();
    } catch (error: any) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error al comparar la contraseña" });
    }
  }

  static verifyUserRol(allowedRoles: userRol[]) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        const token =
          req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "No autorizado" });
        }
        const decoded: any = jwt.verify(token, TOKEN_SECRET);
        const userRol: userRol = decoded.rol;

        if (!allowedRoles.includes(userRol)) {
          return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
      } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: "Error al verificar el rol" });
      }
    };
  }

  static async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No autorizado" });
      }
      const decoded: any = jwt.verify(token, TOKEN_SECRET);
      req.body.user = decoded;
      next();
    } catch (error: any) {
      console.log(error);
      return res.status(401).json({ message: "Token no valido" });
    }
  }
}
