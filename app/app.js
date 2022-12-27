import express from "express"
import cors from "cors"
import docoptions from "../document/document.js"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { buscador, category, login, order, products, users } from "../routes/index.js";
import { db } from "../database/mongoDb.js";
import * as dotenv from 'dotenv'
import { noEncontrado } from "../helpers/Error/error404.js";
dotenv.config()
export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.mongoDb();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(cookieParser())
        //Read json format - leer formato json
        this.app.use(express.json());
        // let  whitelist = [process.env.HOST1, "http://localhost:3000/api/v1"];
        // this.app.use(cors({
        //     origin: function (origin, callback) {
        //         console.log(origin)
        //         if (whitelist.includes(origin)) {
        //           return callback(null, true)
        //         } 
        //         return callback(
        //             `Error de Cors origin: ${origin} no autorizado`
        //         )
        //       }
        // }));
        //Route from document swagger
        this.app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(docoptions)));
        this.app.use(fileUpload({ useTempFiles : true, tempFileDir : '/tmp/'})) 
    }   
    routes() {
        this.app.use("/api/v1", products);
        this.app.use("/api/v1", category);  
        this.app.use("/api/v1", buscador);
        this.app.use("/api/v1", users);
        this.app.use("/api/v1", login);
        this.app.use("/api/v1", order);
        //Ruta no encontrada  
        this.app.use(noEncontrado)
    }
    async mongoDb(){
        await db();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Escuchando", this.port)
        })
    }
}   