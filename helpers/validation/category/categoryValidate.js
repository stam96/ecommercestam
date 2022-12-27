import { body, param } from "express-validator";
import { existsCategory, noexistsCategory } from "../../customs/functionCategory.js";
const validateCategory = [
  body("nombre", "Ingrese campo nombre en categoria")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .custom(existsCategory)
];

const isIDmongo = [
  param("id", "Debe ser un id valido de mongo y de tipo String ").isMongoId().not().isEmpty().trim().escape().custom(noexistsCategory)
];


export {
    validateCategory,
    isIDmongo,
}   