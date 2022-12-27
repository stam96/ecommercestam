import { request, response } from "express";
import { modelCategory } from "../models/Categorys.js";

const createCategory = async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const category = new modelCategory({
      nombre,
    });
    // if(category.nombre) {
    //   return res.status(400).json({msg:"Categoria ya existente"})
    // }
    await category.save();
    return res
      .status(201)
      .json({ msg: "Categoria creada correctamente.", nombre: category.nombre });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const getCategorys = async (req = request, res = response) => {
  try {
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };
    //console.log(typeof Number(limit))
    //const category = await modelCategory.find({ estado: true }).limit(Number(limit)).skip(desde);
    //const total = await modelCategory.count()
    const [category, total] = await Promise.all([
      modelCategory.find({ estado: true }).limit(Number(limit)).skip(desde),
      modelCategory.count(query),
    ]);
    return res.status(200).json({ total, category });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const getCategoryId = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const category = await modelCategory.findById(id);
    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const deleteCategoryId = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    //const category = await modelCategory.findByIdAndDelete(id);
    const category = await modelCategory.findByIdAndUpdate(id, {
      estado: false,
    });
    return res.status(200).json({msg:"Categoria eliminada correctamente.", nombre:category.nombre});
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const updateCategoryId = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const category = await modelCategory.findByIdAndUpdate(
      id,
      { nombre },
      { new: true }
    );
    return res.status(200).json({msg:"Categoria actualizada correctamente.", nombre:category.nombre});
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

export {
  createCategory,
  getCategorys,
  getCategoryId,
  deleteCategoryId,
  updateCategoryId,
};
