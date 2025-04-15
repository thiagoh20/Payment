import { z } from "zod";

export const registerUserPortal = z.object({
  user_name: z
    .string({
      required_error: "El nombre de usuario es requerido",
      invalid_type_error: "Debe de ser un string",
    })
    .min(1, "El nombre de usuario no puede ir vacio"),
  user_email: z
    .string({
      required_error: "El email de usuario es requerido",
      invalid_type_error: "Debe de ser un string",
    })
    .email("El email no es valido"),
  user_phone: z
    .string({
      required_error: "El telefono de usuario es requerido",
      invalid_type_error: "Debe de ser un string",
    })
    .min(1, "El telefono de usuario no puede ir vacio"),
  user_password: z
    .string({
      required_error: "La contraseña de usuario es requerida",
      invalid_type_error: "Debe de ser un string",
    })
    .min(8, "La contraseña debe de tener al menos 8 caracteres"),
  rol: z
    .string({
      required_error: "El rol de usuario es requerido",
      invalid_type_error: "Debe de ser un string",
    })
    .min(1, "El rol de usuario no puede ir vacio"),
  id_company: z
    .number({
      required_error: "El id de la compañia  es requerido",
      invalid_type_error: "Debe de ser un numero entero",
    })
    .min(1, "El id de la compañia no puede ir vacio"),
});

export const loginUserPortal = z.object({
  user_email: z
    .string({
      required_error: "El email de usuario es requerido",
      invalid_type_error: "Debe de ser un string",
    })
    .email("El email no es valido"),
  user_password: z
    .string({
      required_error: "La contraseña de usuario es requerida",
      invalid_type_error: "Debe de ser un string",
    })
    .min(8, "La contraseña debe de tener al menos 8 caracteres"),
});
