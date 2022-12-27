import nodemailerSendgrid from "nodemailer-sendgrid";
import nodemailer from "nodemailer";
const createTransport = () => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey:
       process.env.SENDGRIDAPI
    })
  );
  return transport;
};

export const sendMail = async (usuario) => {
  const transporter = createTransport();
  await transporter.sendMail(
    {
      from: "rafaraul755@gmail.com", // sender address
      to: [`${usuario.correo}`, "rafaraul755@gmail.com"], // list of receivers
      subject: `${usuario.nombre}`, // Subject line
      text: "Bienvenido", // plain text body
      html: `
    <h2>Ingreso de codigo para verificar cuenta </h2>
    <h2>${usuario.tokenEmail}</h2>`,
    },
   
    function (error, info) {
      if (error) {
        return console.log(error.message);
      }
      console.log("Mensaje enviado");
    }
  );
  return;
};
