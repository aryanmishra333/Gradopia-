import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: '',
        role: 'Alumni',
        graduationYear: '',
        currentJobTitle: '',
        linkedInProfile: '',
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
            alert('Registration successful');
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                <input type="date" name="dateOfBirth" onChange={handleChange} />
                <select name="role" onChange={handleChange} required>
                    <option value="Alumni">Alumni</option>
                    <option value="Student">Student</option>
                </select>
                <input type="number" name="graduationYear" placeholder="Graduation Year" onChange={handleChange} />
                <input type="text" name="currentJobTitle" placeholder="Current Job Title" onChange={handleChange} />
                <input type="url" name="linkedInProfile" placeholder="LinkedIn Profile" onChange={handleChange} />
                <p>
                    Already have an account? <Link to="/login">Login</Link> {/* Use Link instead of a tag */}
                </p>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
