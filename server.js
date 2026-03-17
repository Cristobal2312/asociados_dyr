const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Endpoint de contacto
app.post('/api/contact', async (req, res) => {
  try {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const asuntoMap = {
      consulta: 'Consulta sobre productos',
      cotizacion: 'Solicitud de cotización',
      soporte: 'Soporte técnico',
      otro: 'Otro'
    };

    // Email al admin
    const mailToAdmin = {
      from: process.env.EMAIL_USER,
      to: 'cristobalnahuel2002@gmail.com',
      subject: `Nuevo contacto: ${asuntoMap[asunto] || asunto}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
        <p><strong>Asunto:</strong> ${asuntoMap[asunto] || asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      `
    };

    // Email de confirmación al usuario
    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmación: Tu mensaje fue recibido',
      html: `
        <h2>Hola ${nombre},</h2>
        <p>Gracias por contactarnos. Hemos recibido tu mensaje y nos comunicaremos contigo lo antes posible.</p>
        <p><strong>Detalles de tu consulta:</strong></p>
        <p>Asunto: ${asuntoMap[asunto] || asunto}</p>
        <p>Mensaje: ${mensaje.replace(/\n/g, '<br>')}</p>
        <p>Saludos,<br>Asociación D y R</p>
      `
    };

    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToUser);

    res.json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al enviar el correo: ' + error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server corriendo en http://localhost:${PORT}`));
