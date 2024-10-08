const db = require('../config/db');

class User {
    static register(userData, callback) {
        const query = `INSERT INTO Users (Username, Password, Email, PhoneNumber, DateOfBirth, Role, GraduationYear, CurrentJobTitle, LinkedInProfile) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [
            userData.username, 
            userData.password, 
            userData.email, 
            userData.phoneNumber, 
            userData.dateOfBirth, 
            userData.role, 
            userData.graduationYear, 
            userData.currentJobTitle, 
            userData.linkedInProfile
        ], callback);
    }

    static findByEmail(email, callback) {
        const query = `SELECT * FROM Users WHERE Email = ?`;
        db.query(query, [email], callback);
    }
}

module.exports = User;
