import db from '../config/db.js'; // Use the appropriate path and ensure it has a default export

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

export default User; // Export the User class as the default export
