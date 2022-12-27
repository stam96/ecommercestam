import { response } from "express"
export const noEncontrado = (req, res = response)=>{
    res.status(404).end()
    //next()
}