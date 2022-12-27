export const accessFiles = (req, res, next) => {
  const extensionesValidas = ["jpg", "png", "jpeg"]
  //console.log(req.files.image)
  const {name} = req.files.image;
  const nombreRecortado = name.split(".").at(-1);
  if(!extensionesValidas.includes(nombreRecortado)){
    return res.status(400).json({msg:`Extension no valida debe incluir estas extensiones de imagenes: ${extensionesValidas}`})
  }
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res
      .status(400)
      .json({
        msg: "No se puede subir archivos debe incluir en el form data la key image",
      });
    return;
  }
  //console.log(req.files)
  next();
};
