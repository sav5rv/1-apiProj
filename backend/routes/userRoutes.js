const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

// Rota para obter todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclui o campo de senha
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});

// Rota para atualizar informações de um usuário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, age } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, phone, age },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
});

// Rota para excluir um usuário - rota /users/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
});

module.exports = router;
