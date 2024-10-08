import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [newsPosts, setNewsPosts] = useState([]);

    useEffect(() => {
        const fetchNewsPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/news`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setNewsPosts(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchNewsPosts();
    }, []);

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
