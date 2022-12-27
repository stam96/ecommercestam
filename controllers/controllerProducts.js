//const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
//import { uploadFiles } from "../middlewares/fileload/fileUpload.js";
//import * as url from "url";
import { request, response } from "express";
import {v2 as cloudinary} from "cloudinary";
import * as dotenv from 'dotenv'
dotenv.config()

import { modelProduct } from "../models/Products.js";

//Configuracion cloudinary
//Por motivos de swagger al intentar separar la estructura no carga imagen
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY_CLODU, 
  api_secret: process.env.API_SECRET_CLOUD,  
  secure: true
});

const createProducts = async (req = request, res = response) => {
  try {
    const { nombre, descripcion, image, precio, rating, category } = req.body;
    const products = new modelProduct({
      nombre,
      descripcion,
      precio,
      rating,
      image,
      category,
    });
    //Subir archivos a cloudinary
    //const {tempFilePath} = req.files.image;
    //const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
    //products.image = secure_url;
    await products.save();
    return res.status(200).json({ msg: "Producto creado correctamente.", nombre:products.nombre });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const getProducts = async (req = request, res = response) => {
  try {
    const { limit = 5, desde = 0 } = req.query;
    const query  = {estado:true}
    //const products = await modelProduct.find().populate("categoria").limit(limit).skip(desde);
    //console.log(products);
    const [products, total] = await Promise.all([
      modelProduct.find({estado:true}).populate("categoria").limit(limit).skip(desde),
      modelProduct.count(query),
    ]);
    //console.log(products)
    return res.status(200).json({ total, products });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const getProductsId = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const products = await modelProduct.findById(id).populate("categoria");
    //console.log(products)
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};


const deleteProductsId = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    /*const products = await modelProduct
      .findByIdAndDelete(id)
      .populate("categoria");*/
    const products = await modelProduct.findByIdAndUpdate(id, {
      estado: false,
    });
    if (products.image) {
      const nombreSplit = products.image.split("/")
      const nombre = nombreSplit.at(-1)
      const [public_id] = nombre.split(".")
      //console.log(public_id)
      cloudinary.uploader.destroy(public_id)
    }

    return res.status(200).json({
      msg: "Producto eliminado correctamente.",
      nombre: products.nombre,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const updateProductsId = async (req = request, res = response) => {
  try {
    //console.log(req.files.image)
    const { id } = req.params;
    const { nombre } = req.body;
    const products = await modelProduct.findByIdAndUpdate(
      id,
      { nombre },
      { new: true }
    );
    if (products.image) {
      const nombreSplit = products.image.split("/")
      const nombre = nombreSplit.at(-1)
      const [public_id] = nombre.split(".")
      //console.log(public_id)
      cloudinary.uploader.destroy(public_id)
    }
    const {tempFilePath} =  req.files.image
    const {secure_url} =  await cloudinary.uploader.upload(tempFilePath);
    products.image = secure_url;  
    await products.save()
    return res.status(200).json({msg:"Producto actualizado correctamente.", nombre:products.nombre});
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

export {
  createProducts,
  getProducts,
  getProductsId,
  deleteProductsId,
  updateProductsId
};
