import { response } from "express";
import { isValidObjectId } from "mongoose";
import { modelCategory, modelProduct } from "../../../models/index.js";

const buscarCategoria = async (termino = "", res = response) => {
  try {
    //Es mongo ID
    const isMongoId = isValidObjectId(termino); //True
    if (isMongoId) {
      const categoryId = await modelCategory.findById(termino);
      //console.log(categoryId)
      return res.status(200).json({ resultado: categoryId ? categoryId : [] });
    }

    //Expresion para buscar con cualquier terminologia
    const regex = new RegExp(termino, "i");
    const nombreCategory = await modelCategory.find({
      $or: [{ nombre: regex }],
      $and: [{ estado: true }],
    });

    if (nombreCategory) {
      return res
        .status(200)
        .json({ resultado: nombreCategory ? nombreCategory : [] });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const buscarProductos = async (termino = "", res = response) => {
  try {
    const isMongoId = isValidObjectId(termino); //True
    //console.log(isMongoId)
    if (isMongoId) {
      const productoId = await modelProduct
        .findById(termino)
        .populate("categoria", "nombre");
      //console.log(productoId)
      return res.status(200).json({ resultado: productoId ? productoId : [] });
    }

    //Expresion para buscar con cualquier terminologia
    const regex = new RegExp(termino, "i");
    const nombreProducto = await modelProduct
      .find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }],
      })
      .populate("categoria");

    if (nombreProducto) {
      return res
        .status(200)
        .json({ resultado: nombreProducto ? nombreProducto : [] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const coleccionsTerminos = (coleccion, termino, res) => {
  switch (coleccion) {
    case "categorys":
      buscarCategoria(termino, res);
      break;
    case "products":
      buscarProductos(termino, res);
      break;
    default:
      return res.status(500).json({ msg: "Busqueda no realizada" });
  }
};
