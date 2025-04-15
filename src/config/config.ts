import "dotenv/config";

//SERVER

const PORT = process.env.PORT ?? 3000;
const TOKEN_SECRET = process.env.TOKEN_SECRET ?? "";
const BACKEND_URL = process.env.BACKEND_URL ?? "";

//DATABASE

const DB_NAME = process.env.DB_NAME ?? "";
const DB_USER = process.env.DB_USER ?? "";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
const DB_HOST = process.env.DB_HOST ?? "";
const DB_DIALECT = process.env.DB_DIALECT ?? "";

//REFACIL

const REFACIL_API_URL = process.env.REFACIL_API_URL ?? "";
const REFACIL_USER = process.env.REFACIL_USER ?? "";
const REFACIL_PASSWORD = process.env.REFACIL_PASSWORD ?? "";

//PAYMENTWAY

const BASE_URL = process.env.BASE_URL ?? "";
const CORE_RECARGAS_API_KEY = process.env.CORE_RECARGAS_API_KEY ?? "";
const BASE_URL_CORE_RECARGAS = process.env.BASE_URL_CORE_RECARGAS ?? "";
const PAYMENTWAY_API_KEY = process.env.PAYMENTWAY_API_KEY ?? "";

export {
  PORT,
  TOKEN_SECRET,
  BACKEND_URL,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  REFACIL_API_URL,
  REFACIL_USER,
  REFACIL_PASSWORD,
  BASE_URL,
  CORE_RECARGAS_API_KEY,
  BASE_URL_CORE_RECARGAS,
  PAYMENTWAY_API_KEY,
};
