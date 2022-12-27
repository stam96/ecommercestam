import { Router } from "express";
import {
  createCategory,
  getCategorys,
  getCategoryId,
  deleteCategoryId,
  updateCategoryId,
} from "../controllers/index.js";
import {
  validateCategory,
  isIDmongo,
} from "../helpers/validation/category/categoryValidate.js";

import { validationResultExpress } from "../middlewares/expressValidate/errorValidate.js";
import { jwtVerify, rolAdministrador } from "../middlewares/jwt/jwtTokenCompare.js";
const router = Router();

/**
 * @swagger
 *  /api/v1/category/:
 *   post:
 *      tags: [tb_categorias]
 *      summary: Crear una nueva categoria se requiere autentificación administrador
 *      description: creacion de categorias
 *      requestBody:
 *          description: Crear una nueva categoria
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/tb_categorias"
 *          required: true
 *      responses:
 *          "201":
 *              description: Categoria creada correctamente.
 *
 *          "400":
 *              description: Categoria ya existente.
 *
 *          "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 *
 */
router.post(
  "/category",
  validateCategory,
  validationResultExpress,
  jwtVerify,
  rolAdministrador,
  createCategory
);

/**
 * @swagger
 *  /api/v1/category/:
 *   get:
 *      tags: [tb_categorias]
 *      summary: Verificar todas las categorias usando query params
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
 *              description: Producto visualizado correctamente.
 *          "500":
 *              description: Error interno del servidor.
 *
 */
router.get("/category", getCategorys);

/**
 * @swagger
 *  /api/v1/category/{id}:
 *   get:
 *      summary: Buscar categoria por id
 *      tags: [tb_categorias]
 *      description: Buscar categoria por id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Ingreso del id para buscar categoria
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *        "200":
 *              description: Obteniendo categoria id.
 *        "400":
 *              description: Debe ser string y de mongoId.
 *        "500":
 *              description: Error interno del servidor.
 *
 */
router.get("/category/:id", isIDmongo, validationResultExpress, getCategoryId);

/**
 * @swagger
 *  /api/v1/category/{id}:
 *   delete:
 *      summary: Eliminar una categoria por id se requiere autentificación administrador
 *      tags: [tb_categorias]
 *      description: Eliminar una categoria por id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Ingreso del id_categoria a eliminar
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *        "200":
 *              description: Categoria eliminada correctamente.
 *        "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 */
router.delete(
  "/category/:id",
  isIDmongo,
  validationResultExpress,
  jwtVerify,
  rolAdministrador,
  deleteCategoryId
);

/**
 * @swagger
 *  /api/v1/category/{id}:
 *   put:
 *      summary: Actualizar una categoria por id se requiere autentificación administrador
 *      tags: [tb_categorias]
 *      description: Actualizar una categoria por id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Ingreso del id_categoria para actualizar
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *        required: true
 *        description: Actualizar una categoria
 *        content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 $ref: "#components/schemas/tb_categorias"
 *      responses:
 *        "200":
 *              description: Categoria actualizada correctamente.
 *
 *        "400":
 *              description: Debe ser string y de mongoId.
 *
 *        "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 *
 */
router.put(
  "/category/:id",
  isIDmongo,
  validationResultExpress,
  jwtVerify,
  rolAdministrador,
  updateCategoryId
);

export { router };
