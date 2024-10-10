import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('jwt'));
    const navigate = useNavigate();

    useEffect(() => {
        // Set up a listener for cookie changes if necessary
        const token = Cookies.get('jwt');
        setIsLoggedIn(!!token); // Set state if token exists
    }, [Cookies.get('jwt')]); // Re-run effect when the cookie changes

    const handleLogout = () => {
        Cookies.remove('jwt'); // Remove token
        setIsLoggedIn(false);  // Update state to reflect logout
        navigate('/login');    // Redirect to login page
    };

    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
