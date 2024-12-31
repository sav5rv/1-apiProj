const express = require('express');
const Feedback = require('../models/feedbackModel');
const nodemailer = require('nodemailer');

const router = express.Router();

// Rota para enviar feedback
router.post('/', async (req, res) => {
    const { email, message } = req.body;

    try {
        // Salvar feedback no banco de dados
        const feedback = await Feedback.create({ email, message });

        // Configuração do transporte do email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // ou outro provedor de email
            auth: {
                user: 'seuemail@gmail.com', // Substitua pelo seu email
                pass: 'suasenha', // Substitua pela sua senha
            },
        });

        // Enviar email para o responsável
        await transporter.sendMail({
            from: email,
            to: 'responsavel@site.com', // Email do responsável
            subject: 'Novo Feedback Recebido',
            text: message,
        });

        res.status(201).json({ message: 'Feedback enviado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao enviar feedback.' });
    }
});

module.exports = router;
