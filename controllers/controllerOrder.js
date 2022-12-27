import { request, response } from "express";
import axios from "axios";
import {
  modelOrder,
  modelProduct,
  modelUsuario,
} from "../models/index.js";


const crearOrden = async (req = request, res = response) => { 
  try {
    //Buscar usuario
    const {productId, products=[], cantidad} = req.body
    const usuario = await modelUsuario.findById(req.usuario.id)
    //Buscamos productos
    const product = await modelProduct.findById(productId)
    const nuevoProducto = {
        precio:product.precio,
        cantidad
    }
    products.push(nuevoProducto)
    const order = new modelOrder({
      usuarioId:usuario.id,
      products,
      amount:product.precio*cantidad
    })
    await order.save();
    return res.status(200).json({msg:"Producto agregado al carrito"})
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const eliminarOrden = async(req = request, res = response)=>{
  try {
    const {id} = req.params;
    await modelOrder.findByIdAndDelete(id);
    return res.status(200).json({msg:"Detalle de orden eliminado correctamente"})
  } catch (error) {
    return res
    .status(500)
    .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const editarOrden = async(req = request, res = response) => {
  try {
    const {id} = req.params;
    const {cantidad} = req.body
    const order = await modelOrder.findById(id);
    if(!order){
      return res.status(404).json({msg:"Orden no existente"})
    }
    const [{precio}] = order.products;
    const actualizar = await modelOrder.findByIdAndUpdate(  id, {
      $set:{
        "products.$[].cantidad":cantidad,
        amount:precio*cantidad
      }
    }, {
      new:true
    })

    await actualizar.save()
    return res.status(200).json({msg:"Producto actualizado"})
  } catch (error) {
    return res
    .status(500)
    .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const verOrden = async(req = request, res = response)=>{
  try {
    const orden = await modelOrder.find({usuarioId:req.usuario.id})
    if(orden.length <= 0){
      return res.status(404).json({msg:"Orden no encontrada Carrito vacio"})
    }
    return res.status(200).json(orden)
  } catch (error) {
    return res
    .status(500)
    .json({ msg: "Error interno del servidor.", error: error.message });
  }
}

const ordenFinal = async (req = request, res = response) => {
  try {
    const {id} = req.params
    const orden = await modelOrder.findById(id);
    if(!orden) return res.status(404).json({msg:"Orden no valida -  id no valido"})
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: orden.amount,
          }
        },
      ],
      application_context: {
        brand_name: "stamtiendaonline.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.HOST}/capture-order`,
        cancel_url: `${process.env.HOST}/cancel-payment`,
      },
    };
    const params = new URLSearchParams()
    params.append("grant_type", "client_credentials")
    const  {data:{access_token}} = await axios.post(`https://api-m.sandbox.paypal.com/v1/oauth2/token`,params    ,{
        headers:{
            'Content-Type': "application/x-www-form-urlencoded"                
        },
        auth:{
            username:process.env.PAYPAL_API_CLIENT,
            password:process.env.PAYPAL_API_SECRET
        }
    })
    const {data: {links}} = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, order, {
        headers:{
            Authorization: `Bearer ${access_token} `
        }
    })
    //Interfaz login paypal
    return res.status(200).json({links:links[1]})
  } catch (error) {
    return res
    .status(500)
    .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const captureOrder = async (req = request, res = response) => {
  try {
    try {
      const {token} = req.query;
      const {data} = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture/`, {},{
          auth:{
              username:process.env.PAYPAL_API_CLIENT,
              password:process.env.PAYPAL_API_SECRET
          }
      })
      return res.status(201).json({msg:"Pago Completado", estado:data.status})
    } catch (error) {
      return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
    }
  } catch (error) {
    return res
    .status(500)
    .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const cancelPayment = (req = request, res = response) => {
  return res.send("Saliendo de la app")
};


export { crearOrden, ordenFinal, captureOrder, cancelPayment, editarOrden, eliminarOrden, verOrden };
