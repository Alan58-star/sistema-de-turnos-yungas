const axios = require("axios");
require('dotenv').config({ path: 'variables.env'});

exports.sendUrlResetPassword = async(
    number,
    url,
  ) => {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: number,
          type: "template",
          template: {
            name: "restablecer_contrasena",
            language: {
              code: "es_AR",
            },
            components: [
              {
                type: "body",
                parameters: [
                  {
                    type: "text",
                    text: url,
                  }
                ],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.USER_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Mensaje enviado exitosamente:", response.data);
    } catch (error) {
      console.error(
        "Error enviando el mensaje:",
        error.response?.data || error.message
      );
    }
  }
  