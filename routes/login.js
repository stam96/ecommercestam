import { Router } from "express";
import { actualizarDatos, eliminarUsuario, loginUser, logout, rutaRefresh} from "../controllers/index.js"
import { validarLogin } from "../helpers/validation/index.js";
import { validationResultExpress } from "../middlewares/expressValidate/errorValidate.js";
import { accessFiles } from "../middlewares/fileload/requiredFileImage.js";
import { jwtVerify, rolAdministrador, rolUsuario, jwtBearerRefresh } from "../middlewares/jwt/jwtTokenCompare.js";
const router = Router(); 

/**
 * @swagger
 *  /api/v1/login/:
 *   post:
 *      tags: [tb_login]
 *      summary: Login de usuario 
 *      description: Login usuario
 *      requestBody:
 *         content:
 *          application/json:
 *                      schema:
 *                         $ref: "#components/schemas/tb_login" 
 *                         required: true  
 *      responses:
 *          "200":
 *              description: Accediendo , token
 *          "400":
 *              description: Contraseña y email no coinciden
 *          "500":
 *              description: Error interno del servidor.
 *
 */
router.post("/login", validarLogin, validationResultExpress, loginUser);

/**
 * @swagger
 *  /api/v1/refresh/:
 *   get:
 *      tags: [tb_login]
 *      summary: Ingresar el token Cookie para generar el nuevo token refresh
 *      description: Generar un nuevo access Token
 *      responses:   
 *          "200":
 *              description: Generar token nuevo correctamente
 *          "500":
 *              description: Error interno servidor       
 *      security:    
 *          - cookieAuth: []  
 *                                              
 */
router.get("/refresh", jwtBearerRefresh, rutaRefresh);

/**
 * @swagger
 *  /api/v1/actualizar-datos:
 *   put:
 *      summary: Actualizar datos usuario requiere autenticacion usuario
 *      tags: [tb_login]
 *      requestBody:
 *        content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  image:
 *                    type: string
 *                    format: binary
 *      responses:
 *        "200":
 *              description: Producto actualizado correctamente.
 *
 *        "400":
 *              description: Debe un IdMongo valido.
 *
 *        "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 *
 */
router.put("/actualizar-datos", jwtVerify, accessFiles, actualizarDatos);

/**
 * @swagger
 *  /api/v1/eliminar-usuario/:
 *   delete:
 *      summary: Eliminar un usuario se requiere token autentificacion
 *      tags: [tb_login]
 *      description: Eliminar un usuario
 *      responses:
 *        "200":
 *              description: Usuario eliminado correctamente.
 *        "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 *
 */
router.delete("/eliminar-usuario", jwtVerify, eliminarUsuario)

/**
 * @swagger
 *  /api/v1/logout/:
 *   get:
 *      tags: [tb_login]
 *      summary: Logout quitar la cookie
 *      description: Eliminar cookie para salir
 *      responses:   
 *          "200":
 *              description: Generar token nuevo correctamente
 *          "500":
 *              description: Error interno servidor     
 *      security:    
 *          - cookieAuth: []                      
 */
router.get("/logout", logout)
export {
    router
}   