import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import './Signin.css';

export default function Signin() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const userTokenData = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/current`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const user = userTokenData.data;
            const userPictureData = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${user.id}`);
            const userPicture = userPictureData.data.picture;

            setUserData({
                ...user,
                picture: userPicture,
            });
            setIsLoggedIn(true);
        } catch (error) {
            handleFetchError(error);
        }
    };

    const handleFetchError = (error) => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('accessToken');
        setUserData(null);
        setIsLoggedIn(false);
        setErrorMessage(error.response?.data?.message || 'An unexpected error occurred');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, data);
            const token = response.data.accessToken;
            localStorage.setItem('accessToken', token);

            fetchUserData(token);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An unexpected error occurred');
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        setUserData(null);
        setIsLoggedIn(false);
    };

    return (

        <>
            {isLoggedIn ? (
                <div className='user-profile-sign'>
                    <UserProfile email={userData.email} picture={userData.picture} username={userData.username} />
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <div className="signin-container">
                    <h2>Sign in</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password" required />
                        </div>

                        <button type="submit">Sign In</button>
                    </form>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <p className="signup-link">
                        Dont have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            )}
        </>
    );
}
