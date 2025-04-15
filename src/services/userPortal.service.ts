import { IUserPortal } from "../interface/userPortal.interface.js";
import { UserPortal } from "../models/user_portal_cp.model.js";

export class userPortalService {
  static async register(data: IUserPortal) {
    try {
      const userRegister = await UserPortal.create({ ...data });
      return userRegister;
    } catch (error: any) {
      throw new Error("Error al registrar el usuario" + error);
    }
  }

  static async CheckEmailRegister(user_email: string): Promise<boolean> {
    try {
      const emailExist = await UserPortal.findOne({ where: { user_email } });
      return !!emailExist;
    } catch (error: any) {
      throw new Error("Error al verificar el email" + error);
    }
  }

  static async getUserByEmail(user_email: string): Promise<IUserPortal | any> {
    try {
      const user = await UserPortal.findOne({ where: { user_email } });
      return user;
    } catch (error: any) {
      throw new Error("Error al obtener el usuario por email" + error);
    }
  }
}
