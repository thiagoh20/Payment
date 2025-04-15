var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserPortal } from "../models/userPortalCP.model.js";
export class userPortalService {
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRegister = yield UserPortal.create(Object.assign({}, data));
                return userRegister;
            }
            catch (error) {
                throw new Error("Error al registrar el usuario" + error);
            }
        });
    }
    static CheckEmailRegister(user_email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailExist = yield UserPortal.findOne({ where: { user_email } });
                return !!emailExist;
            }
            catch (error) {
                throw new Error("Error al verificar el email" + error);
            }
        });
    }
    static getUserByEmail(user_email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserPortal.findOne({ where: { user_email } });
                return user;
            }
            catch (error) {
                throw new Error("Error al obtener el usuario por email" + error);
            }
        });
    }
}
