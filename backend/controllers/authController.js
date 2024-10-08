const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = (req, res) => {
    const { username, email, password, phoneNumber, dateOfBirth, role, graduationYear, currentJobTitle, linkedInProfile } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error hashing password');

        const newUser = {
            username,
            email,
            password: hashedPassword,
            phoneNumber,
            dateOfBirth,
            role,
            graduationYear,
            currentJobTitle,
            linkedInProfile,
        };

        User.register(newUser, (err, result) => {
            if (err) return res.status(500).send('Registration failed');
            res.status(201).send('User registered successfully');
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, result) => {
        if (err || result.length === 0) return res.status(404).send('User not found');

        const user = result[0];

        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).send('Invalid credentials');

            const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        });
    });
};
