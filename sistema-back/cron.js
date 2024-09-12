const cron = require('node-cron');
const axios = require('axios');


const token = 'EAASUrq8QlP0BOxPPo0tuiVMd5VLBtdbYWtnT4kFvC2xCOX1aXrxM4FXDZB8andSgvDxfOYAbBRlzWi1kQXYyjN4z46K0IyaeZCDUqy0e7fvpxu71DTqYfB38igLgAhJKZBrdgbPVl3NK3GuZBfoOXpmZCGLIZBppChKZC424oFyAIKNrEZCpZBb0g6iJroJwaal9mZAzwi8Ubi862k3IU1ivekQfVswEPoK0q5ph7ZB';
const recipientPhoneNumber = '543884635285';

cron.schedule('13 22 * * *', () => {
    enviarMensajeWhatsApp();
  });
  

async function enviarMensajeWhatsApp() {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v20.0/398388510029004/messages`,
      {
        messaging_product: 'whatsapp',
        to: recipientPhoneNumber,
        type: 'template',
        template: {
            name: 'info_turno',
            language: {
              code: 'es_AR'
            },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: 'Nombre Paciente'
                  },
                  {
                    type: 'text',
                    text: '15 de septiembre de 2024, 10:00 AM'
                  },
                  {
                    type: 'text',
                    text: 'Lionel Scaloni'
                  },
                  {
                    type: 'text',
                    text: 'consultorio'
                  },
                  {
                    type: 'text',
                    text: 'Cirugia'
                  }
                ]
              }
            ]
          }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Mensaje enviado exitosamente:', response.data);
  } catch (error) {
    console.error('Error enviando el mensaje:', error.response?.data || error.message);
  }
}
