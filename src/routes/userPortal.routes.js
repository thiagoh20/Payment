import { Router } from "express";
import { userPortalMiddleware } from "../middlewares/userPortal.middleware.js"
import { userPortalController } from "../controllers/userPortal.controller.js";
import { validateMiddleware } from "../middlewares/validator.middleware.js";
import { registerUserPortal , loginUserPortal} from "../schemas/userPortal.schema.js";
import { userRol } from "../interface/userPortal.interface.js";

const router = Router();    

/**
 * Swagger Documentation for User Portal Routes
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UserPortal:
 *       type: object
 *       required:
 *         - user_name
 *         - user_phone
 *         - user_email
 *         - user_password
 *         - rol
 *         - id_company
 *       properties:
 *         user_name:
 *           type: string
 *         user_phone:
 *           type: string
 *         user_email:
 *           type: string
 *         user_password:
 *           type: string
 *         rol:
 *           type: string
 *         id_company:
 *           type: integer
 *     LoginUserPortal:
 *       type: object
 *       required:
 *         - user_email
 *         - user_password
 *       properties:
 *         user_email:
 *           type: string
 *         user_password:
 *           type: string
 */

/**
 * @openapi
 * /user-portal/register-user-portal:
 *   post:
 *     summary: Registrar usuario del portal
 *     tags:
 *       - UserPortal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPortal'
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_name:
 *                   type: string
 *                 rol:
 *                   type: string
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 */


router.post("/register-user-portal",validateMiddleware.validateSchema(registerUserPortal),userPortalMiddleware.verifyUserRol([userRol.ADMIN]) ,userPortalMiddleware.checkMailRegister ,userPortalMiddleware.hashPassword, userPortalController.registerUserPortal); 
/**
 * @openapi
 * /user-portal/login-user-portal:
 *   post:
 *     summary: Iniciar sesión usuario del portal
 *     tags:
 *       - UserPortal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserPortal'
 *     responses:
 *       200:
 *         description: Usuario logueado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_name:
 *                   type: string
 *                 rol:
 *                   type: string
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.post("/login-user-portal",validateMiddleware.validateSchema(loginUserPortal) , userPortalMiddleware.checkMailLogin, userPortalMiddleware.comparePassword, userPortalController.loginUserPortal);
/**
 * @openapi
 * /user-portal/logout-user-portal:
 *   post:
 *     summary: Cerrar sesión del usuario
 *     tags:
 *       - UserPortal
 *     responses:
 *       200:
 *         description: Usuario deslogueado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.post("/logout-user-portal", userPortalMiddleware.verifyToken , userPortalController.logoutUserPortal);

/**
 * @openapi
 * /user-portal/generate-token:
 *   post:
 *     summary: Generar token sin expiración (uso administrativo)
 *     tags:
 *       - UserPortal
 *     responses:
 *       200:
 *         description: Token generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */

router.post("/generate-token", userPortalMiddleware.verifyUserRol([userRol.ADMIN]), userPortalController.generateTokenValidate);

export default router;