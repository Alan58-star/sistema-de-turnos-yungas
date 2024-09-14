const cron = require("node-cron");
const axios = require("axios");
const Turno = require("./models/Turno");
const {
  log,
} = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");

const token =
  "EAASUrq8QlP0BOzmKfZBraJjTmh9OoTKqZCFiIxhCnWfl6tvzuQGtZC0mIdSA9DdyiZBZB6aEZCarKVALzXzZAlatPB0n0rKk3sTZAWkzzE9JZBIco3GHCc1skAL2rj0mvY1ErlD1fZAv05rRsC1ZAclBRZAgwGwkhBzBseMCae0rSwBtZAoP2N5mF0YDCiPtJBv2EZAQa0APSD5at6BOdZAT87dRI2iN48ismVHMQFZBmgUZD";
const recipientPhoneNumber = "543884796051";

// obtenerTurnos();

// console.log(turnos);


procesarTurnos();
cron.schedule("10 00 * * *", () => {
  // enviarMensajeWhatsApp();
  // obtenerTurnos()
});

async function enviarMensajeWhatsApp(
  number,
  nombre,
  fecha,
  doctor,
  consultorio,
  especialidad
) {
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
                  text: nombre,
                },
                {
                  type: "text",
                  text: fecha,
                },
                {
                  type: "text",
                  text: doctor,
                },
                {
                  type: "text",
                  text: consultorio,
                },
                {
                  type: "text",
                  text: especialidad,
                },
              ],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

async function obtenerTurnos() {
  try {
    const turnos = await Turno.find({}).populate(
      "medico_id paciente_id obras_sociales.obrasocial_id especialidad_id"
    );
    return turnos;
  } catch (error) {
    console.log(error);
  }
}

async function procesarTurnos() {
  let turnos = await obtenerTurnos();
  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].fecha) {
      
      
      const fechaTurno = new Date(turnos[i].fecha);
      const fechaActual = new Date(); // Fecha y hora actual

      // Comparamos las fechas. Puedes ajustar la lógica de comparación según lo que necesites.
      if (fechaTurno.toDateString() === fechaActual.toDateString()) {

        // let doctor = turnos[i].medico_id.apellido
        if (turnos[i].medico_id != null) {
          console.log(turnos[i]);
          
          enviarMensajeWhatsApp(
            turnos[i].paciente_id.telefono,
            turnos[i].paciente_id.nombre,
            turnos[i].fecha,
            turnos[i].medico_id.nombre,
            turnos[i].consultorio,
            turnos[i].especialidad_id.nombreEsp
          );
        }
        
        
      }
    }
  }
}
