require('dotenv').config({ path: 'variables.env'});
const {client} = require('../utils/whatsapp')

exports.sendUrlResetPassword = async(target, link) => {

  if (!target) {
    return res
      .status(400)
      .json({ error: "Número de destino y mensaje son requeridos" });
  }

  const mensaje = `*Restablecer contraseña*\n\nRecibimos una solicitud para restablecer su contraseña. Para crear una nueva contraseña, por favor, haga clic en el siguiente enlace. \n\n🔗 ${link} \n\nSi no solicito este cambio, ignore este mensaje.\nSaludos cordiales.\n*Hospital Distrital las Heras*`;

  try {
    const chatId = `${target}@c.us`;
    const response = await client.sendMessage(chatId, mensaje);
    console.log("enviado!!!", response);
    
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    console.log("error!!!!");
    
  }
}

exports.recordatorio = async(target, paciente, fechaHora, doctor, consultorio, especialidad) => {

  if (!target) {
    return res
      .status(400)
      .json({ error: "Número de destino y mensaje son requeridos" });
  }

  const mensaje = `*Recordatorio de su turno*\n\nEstimado/a *${paciente}*. \n\nLe recordamos que tiene una cita médica programada para el día de hoy. A continuación, los detalles de su turno: \n\n📆 *Fecha y Hora*: ${fechaHora}\n🧑‍⚕️ *Doctor*: ${doctor}\n🏥 *Consultorio*: ${consultorio}\n🩺 *Especialidad*: ${especialidad} \n\nLe solicitamos que asista puntualmente a su cita. En caso de que necesite reprogramarla o cancelarla, le rogamos nos lo comunique lo antes posible.\n\nGracias por su atención y confianza en nuestros servicios.\n\nAtentamente *Hospital Distrital las Heras*`;

  try {
    const chatId = `${target}@c.us`;
    const response = await client.sendMessage(chatId, mensaje);
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
}
  