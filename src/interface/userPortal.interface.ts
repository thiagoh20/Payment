export enum userRol {
  ADMIN = "admin",
  BUSSINESS = "business",
}

export interface IUserPortal {
  id_user_portal?: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_password: string;
  rol: userRol;
  id_company: number;
}
