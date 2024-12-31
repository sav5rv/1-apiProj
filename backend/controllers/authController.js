const User = require('../models/userModel');
const AccessLog = require('../models/accessLogModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        await AccessLog.create({ email, ip: req.ip, status: 'failed' });
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, 'secret');
    await AccessLog.create({ email, ip: req.ip, status: 'success' });

    res.json({ token });
};

exports.register = async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    res.status(201).json(user);
};
