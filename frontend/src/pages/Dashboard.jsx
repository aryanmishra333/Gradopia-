import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [newsPosts, setNewsPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewsPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Redirect to login if no token is found
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/news`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setNewsPosts(response.data);
            } catch (err) {
                console.error(err);
                // Optional: handle error (e.g., if token is expired or invalid)
                navigate('/login'); // Redirect to login on error
            }
        };

        fetchNewsPosts();
    }, [navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            <ul>
                {newsPosts.map((post) => (
                    <li key={post.NewsID}>
                        <h3>{post.Title}</h3>
                        <p>{post.Content}</p>
                        <p>Posted on: {post.PostedDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
