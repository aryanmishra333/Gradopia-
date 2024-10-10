import bcrypt from 'bcryptjs';
import User from '../models/user.js';  // Ensure the path ends with .js
import generateTokenAndSetCookie from '../utils/generateToken.js';  // Ensure the path ends with .js

// Define your functions
const register = (req, res) => {
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
            
            // Set token and cookie upon successful registration
            generateTokenAndSetCookie(result.insertId, res);  // Assuming `insertId` is the new user's ID

            res.status(201).send('User registered successfully');
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, result) => {
        if (err || result.length === 0) return res.status(404).send('User not found');

        const user = result[0];

        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).send('Invalid credentials');

            // Set token and cookie upon successful login
            generateTokenAndSetCookie(user.UserID, res);

            res.status(200).json({ token: 'JWT token set in cookie' });
        });
    });
};

const logout = (req, res) => {
    // Clear the cookie by setting its expiration date to a past time
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).send('Logged out successfully');
};

// Use named exports
export { register, login, logout };

// Or if you want to export them all as a default export, you can do this:
export default { register, login, logout }; // Uncomment this line if you want to use default export