const cron = require("node-cron");
const axios = require("axios");
const Turno = require("./models/Turno");
const {
  log,
} = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");

const token =
  "EAASUrq8QlP0BOyRDAaMQiZCEplaBHzOpFim5Q0GUunv7iIx0ZC52Cw9yqLaBhvQKNS8Yb3UgZASS6GOCuqfiY8aA4vaCf3mRZCV9XyjYpA1MfNXuGyLpgrw7ONh72tutdn5x9pL0B2n2ALZBsJ30d4uxD4NNTwjeMCeikoLMcW7XZAC42ZCnKy2F2EhavzREBcI";
const recipientPhoneNumber = "543884796051";

// obtenerTurnos();

// console.log(turnos);


cron.schedule("32 20 * * *", () => {
  // enviarMensajeWhatsApp();
  // obtenerTurnos()
  procesarTurnos();
});

// eliminarTurnos()

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

async function eliminarTurnos() {
  let turnos = await obtenerTurnos();
  for (let i = 0; i < turnos.length; i++) {
    const fechaTurno = new Date(turnos[i].fecha);
    const fechaActual = new Date();

    const fechaTurnoNormalizada = new Date(fechaTurno.getFullYear(), fechaTurno.getMonth(), fechaTurno.getDate());
    const fechaActualNormalizada = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

    const diferenciaTiempo = fechaActualNormalizada.getTime() - fechaTurnoNormalizada.getTime();

    const diferenciaDias = diferenciaTiempo / (1000 * 60 * 60 * 24);

    if (diferenciaDias >= 1) {
      const id = turnos[i]._id;
      try {
        const turno = await Turno.findByIdAndDelete(id);
        if (!turno) {
          console.log("No se encontró el turno para eliminar.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}



