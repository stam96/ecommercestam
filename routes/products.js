import { Router } from "express";
import {
  createProducts,
  deleteProductsId,
  getProducts,
  getProductsId,
  updateProductsId
} from "../controllers/index.js";
import {
  validateProducts,
  isIDmongoProduct,
} from "../helpers/validation/index.js";
import { validationResultExpress } from "../middlewares/expressValidate/errorValidate.js";
import { accessFiles } from "../middlewares/fileload/requiredFileImage.js";
import { jwtVerify, rolAdministrador } from "../middlewares/jwt/jwtTokenCompare.js";
const router = Router();

/**
 * @swagger
 *  /api/v1/products/:
 *   post:
 *      tags: [tb_products]
 *      summary: Crear un nuevo producto se requiere autentificación administrador
 *      description: Añadir un nuevo producto
 *      requestBody:
 *         content:
 *          application/json:
 *                      schema:
 *                         $ref: "#components/schemas/tb_products" 
 *                         required: true  
 *      responses:
 *          "200":
 *              description: Producto creado correctamente
 *          "400":
 *              description: Producto ya existente
 *          "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 *
 */
router.post(
  "/products",
  validateProducts,
  validationResultExpress,
  jwtVerify,
  rolAdministrador,
  createProducts
);

/**
 * @swagger
 *  /api/v1/products/:
 *   get:
 *      tags: [tb_products]
 *      summary: Verificar todas los productos usando query params
 *      description: Ver categorias
 *      parameters:
 *          - in: query
 *            name: limit
 *            description: Ingreso del limit para determinar la cantidad de registro a obtener
 *            required: true
 *            schema:
 *              type: string
 *          - in: query
 *            name: desde
 *            description: Ingreso desde el punto de partida para obtener los registros
 *            schema:
 *              type: string
 *
 *      responses:
 *          "200":
 *              description: Productod visalizados correctamente.
 *
 *          "500":
 *              description: Error interno del servidor.
 *
 */
router.get("/products", getProducts);

/**
 * @swagger
 *  /api/v1/products/{id}:
 *   get:
 *      summary: Buscar producto por id
 *      tags: [tb_products]
 *      description: Buscar producto por id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Ingreso del id para buscar un producto
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *        "200":
 *              description: Obteniendo producto id
 *
 *        "400":
 *              description: Debe ser un MongoId valido
 *        "500":
 *              description: Error interno del servidor.
 *
 */
router.get(
  "/products/:id",
  isIDmongoProduct,
  validationResultExpress,
  getProductsId
);

/**
 * @swagger
 *  /api/v1/products/{id}:
 *   delete:
 *      summary: Eliminar un producto por id se requiere autentificación administrador
 *      tags: [tb_products]
 *      description: Eliminar un producto por id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Ingreso del id a eliminar producto
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *        "200":
 *              description: Producto eliminado correctamente.
 *        "400":
 *              description: Debe ser un MongoId valido.
 *        "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 *
 */
router.delete(
  "/products/:id",
  isIDmongoProduct,
  validationResultExpress,
  jwtVerify,
  rolAdministrador,
  deleteProductsId
);

/**
 * @swagger
 *  /api/v1/products/{id}:
 *   put:
 *      summary: Actualizar un producto por id se requiere autentificación administrador
 *      tags: [tb_products]
 *      description: Actualizar un producto por id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Ingreso del id producto para actualizar
 *            required: true
 *            schema:
 *              type: string
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
router.put(
  "/products/:id",
  isIDmongoProduct,
  validationResultExpress,
  jwtVerify,
  rolAdministrador,
  accessFiles,
  updateProductsId
);


export { router };
