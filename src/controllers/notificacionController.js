// Simulación de envío de notificación por WhatsApp
const enviarWhatsApp = (req, res) => {
  const { telefono, mensaje } = req.body;
  res.json({
    status: 'ok',
    tipo: 'whatsapp',
    telefono,
    mensaje,
    info: 'Simulación: mensaje enviado por WhatsApp'
  });
};

// Simulación de envío de notificación por Email
const enviarEmail = (req, res) => {
  const { email, asunto, mensaje } = req.body;
  res.json({
    status: 'ok',
    tipo: 'email',
    email,
    asunto,
    mensaje,
    info: 'Simulación: email enviado'
  });
};

module.exports = {
  enviarWhatsApp,
  enviarEmail
}; 