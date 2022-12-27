import { request, response } from "express";
//import { isValidObjectId } from "mongoose";
import { coleccionsTerminos } from "../helpers/customs/BusquedaTerminos/coleccion.js";
//import { modelCategory } from "../models/Categorys.js";
const coleccionePermitidas = ["products", "categorys"];

// const buscarCategoria = async (termino = "", res = response) => {
//   try {
//     const isMongoId = isValidObjectId(termino);

//     if (isMongoId) {
//       const categoryId = await modelCategory.findById(termino)
//       return res.status(200).json({ resultado: categoryId ? categoryId : [] });
//     }

//     //Expresion para buscar con cualquier terminologia
//     const regex = new RegExp(termino, "i");
//     const nombreCategory = await modelCategory.find({
//       $or: [{ nombre: regex }],
//       $and: [{ estado: true }]
//     });

//     if (nombreCategory) {
//       return res.status(200).json({ resultado: nombreCategory ? nombreCategory : [] });
//     }

//     // if (nombreCategory.length === 0) {
//     //   return res
//     //     .status(200)
//     //     .json({ msg: "No existe categoria con ese termino" });
//     // }
//     // res.status(200).json({ nombreCategory });

//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

const buscadorQuery = (req = request, res = response) => {
  const { coleccion, termino } = req.query;
  if (!coleccionePermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Coleccion no permitida solo se incluye estos datos ${coleccionePermitidas}`,
    });
  }
  coleccionsTerminos(coleccion, termino, res);
};

const buscadorId = (req = request, res = response) => {
  const { coleccion, termino } = req.params;
  if (!coleccionePermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Coleccion no permitida solo se incluye estos datos ${coleccionePermitidas}`,
    });
  }
  //Switch
  coleccionsTerminos(coleccion, termino, res);

  // switch (coleccion) {
  //   case "categorys":
  //     buscarCategoria(termino, res);
  //     break;
  //   case "products":
  //     break;
  //   default:
  //     return res.status(500).json({ msg: "Busqueda no realizada" });
  // }
  // return res.json({
  //   coleccion,
  //   termino,
  //   msg: "Buscando....",
  // });
};

export { buscadorQuery, buscadorId };
