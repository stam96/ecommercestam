import { body, param } from "express-validator";
import {
  existsProducts,
  noexistsProducts,
  verificarCategory,
} from "../../customs/functionProducts.js";
const validateProducts = [
  body("nombre", "Ingrese campo nombre producto")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .custom(existsProducts),
  body("descripcion", "Ingrese campo descripcion producto")
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body("precio", "Ingrese campo precio producto")
    .isNumeric()
    .isFloat({ min: 1, max: 9999 })
    .withMessage("Valores maximo 9999 minimo 1"),
  body("rating", "Ingrese campo rating")
    .isNumeric()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Valores maximo 5 minimo 0"),
  body("category", "Ingrese IdMongo valido")
    .isMongoId()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .custom(verificarCategory),
];

const isIDmongoProduct = [
  param("id", "Debe ser un id valido de mongo y de tipo String ")
    .isMongoId()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .custom(noexistsProducts),
];

export { validateProducts, isIDmongoProduct };
