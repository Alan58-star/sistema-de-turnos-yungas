const axios = require("axios");

exports.sendUrlResetPassword = async(
    number,
    url,
  ) => {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v20.0/398388510029004/messages`,
        {
          messaging_product: "whatsapp",
          to: number,
          type: "template",
          template: {
            name: "info_turno",
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
                  },
                  {
                    type: "text",
                    text: "prueba",
                  },
                  {
                    type: "text",
                    text: "prueba",
                  },
                  {
                    type: "text",
                    text: "prueba",
                  },
                  {
                    type: "text",
                    text: "prueba",
                  },
                ],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
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
  