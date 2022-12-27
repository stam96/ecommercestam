const docoptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentacion Api-rest",
      version: "1.0",
    },
    servers: [
      {
        //url: "http://localhost:3000",
        url: "https://ecommercestam-production.up.railway.app",
        description: "url servidor",
      },
    ],
    //components
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
        cookieAuth: {
          type: "apiKey",
          name: "refreshToken",
          in: "cookie",
        },
      },
      schemas: {
        tb_categorias: {
          type: "object",
          required: ["nombre"],
          properties: {
            nombre: {
              type: "string",
              description: "nombre de categoria",
              example: "Sony",
            },
          },
        },
        tb_products: {
          type: "object",
          required: ["nombre", "descripcion", "precio", "rating", "categoria"],
          properties: {
            nombre: {
              type: "string",
              description: "nombre del producto",
              example: "Sony de 77 pulgadas",
            },
            descripcion: {
              type: "string",
              description: "descripcion del producto",
              example:
                "Excelente televisor 8k con tecnologia sound max modelo x7g",
            },
            precio: {
              type: "integer",
              description: "precio del producto",
              example: 1500,
            },
            rating: {
              type: "integer",
              description: "rating del producto",
              example: 5,
            },
            category: {
              type: "string",
              description: "Object Id de una categoria valida y existente",
              example: "63ab0a9f8652936fd11c551e",
            },
            image: {
              type: "string",
              example: null,
            },
          },
        },
        tb_registro: {
          type: "object",
          required: ["nombre", "correo", "contrasena", "repetirContrasena"],
          properties: {
            nombre: {
              type: "string",
              description: "nombre de usuario",
              example: "Stam",
            },
            correo: {
              type: "string",
              description: "Ingresar Correo",
              example: "user1@gmail.com",
            },
            contrasena: {
              type: "string",
              description: "Contrasena",
              example: "12345678",
            },
            repetirContrasena: {
              type: "string",
              description: "Repetir contrasena",
              example: "12345678",
            },
          },
        },
        tb_restablecerToken: {
          type: "object",
          required: ["correo"],
          properties: {
            correo: {
              type: "string",
              description: "Ingresar Correo",
              example: "user1@gmail.com",
            },
          },
        },
        tb_actualizar: {
          type: "object",
          required: ["contrasena", "repetirContrasena"],
          properties: {
            contrasena: {
              type: "string",
              description: "Ingresar contraseña",
              example: "23456789",
            },
            repetirContrasena: {
              type: "string",
              description: "Ingresar repetir contraseña",
              example: "23456789",
            },
          },
        },
        tb_login: {
          type: "object",
          required: ["correo", "contrasena"],
          properties: {
            correo: {
              type: "string",
              description: "Ingreso del correo",
              example: "jeolcarlo145@gmail.com",
            },
            contrasena: {
              type: "string",
              description: "Ingresar contraseña",
              example: "12345678",
            },
          },
        },
        tb_order:{
          type: "object",
          required: ["productId", "cantidad"],
          properties: {
            productId: {
              type: "string",
              description: "Ingreso del id de producto",
              example: "63ab0abb8652936fd11c5525",
            },
            cantidad: {
              type: "integer",
              description: "Ingresar cantidad",
              example: 1,
            },
          },
        },
        tb_orderActualizar:{
          type: "object",
          required: ["cantidad"],
          properties: {
            cantidad: {
              type: "integer",
              description: "Ingresar cantidad",
              example: 1,
            },
          },
        }
      },
    },
  },
  //apis
  apis: ["./routes/*.js"],
};

export default docoptions;
