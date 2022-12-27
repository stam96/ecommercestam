import { v4 as uuidv4 } from "uuid";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
export const uploadFiles = (files, allowsExtensions = ["jpg", "png"]) => {
  return new Promise((resolve, reject) => {
    const { image } = files;
    const cortarNombre = image.name.split(".").at(-1);
    console.log(cortarNombre)
    if (!allowsExtensions.includes(cortarNombre)) {
      reject({
        msg: "Extension no permitida debe incluir " + allowsExtensions,
      });
      //return res.status(400).json({msg:"Extension no permitida debe incluir " + allowsExtensions})
    }
    //Generar id unico con extensiones
    const nombreTemp = uuidv4() + "." + cortarNombre;
    //Ruta destino donde se enviaran las imagenes
    const uploadPath = __dirname + ("../../uploads/" + nombreTemp);
    
    image.mv(uploadPath, function (err) {
      if (err) {
        //return res.status(500).json({err});
        reject({
          msg: err,
        });
      }
      //res.json({ msg: "File " + uploadPath });
      resolve(nombreTemp)
    });
    //console.log(req.files)
    //next()
  });
};
