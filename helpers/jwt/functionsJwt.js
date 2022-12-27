import jwt from "jsonwebtoken";
const jwtSing = ({id})=>{
  const expiresIn = "30min"
    const token = jwt.sign({id},process.env.SECRET_KEY_JWT ,{
        expiresIn
      })
      return {
        token,
        expiresIn
      }
}

const jwtTokenCookie = ({id}, res)=>{
  const expireRefresh = 60*60*24*30;
  try {
    const refreshToken = jwt.sign({id}, process.env.SECRET_KEY_JWTREFRESH,{
      expiresIn:expireRefresh
  })
  res.cookie("refreshToken", refreshToken,{
    //evita ver la cookie desde el document
    httpOnly:true,
    secure:!(process.env.MODO === "developer"),
    expires:new Date(Date.now()+expireRefresh * 1000)
})
  return {
    refreshToken,
    expireRefresh
  }
  } catch (error) {
    return res.status(500).json({mensaje:"Error interno  del servidor."})
  }
}
export {
    jwtSing,
    jwtTokenCookie
}