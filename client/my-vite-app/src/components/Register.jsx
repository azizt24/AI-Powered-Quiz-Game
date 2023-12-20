import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        picture: null,
        picturePreview: null,
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const file = e.target.files[0];
            if (file) {
                setFormData((prevData) => ({
                    ...prevData,
                    picture: file,
                    picturePreview: URL.createObjectURL(file),
                }));
            }
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64Image = event.target.result;

            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    picture: base64Image,
                });

                console.log('Registration successful:', response.data);

                setSuccessMessage('Registration successful!');

                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    picture: null,
                    picturePreview: null,
                });

            } catch (error) {
                console.error('Registration failed:', error.message);
            }
        };

        if (formData.picture) {
            reader.readAsDataURL(formData.picture);
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Choose a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="picture">Profile Picture:</label>
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        onChange={handleChange}
                        accept="image/*"
                    />
                    {formData.picturePreview && (
                        <img
                            src={formData.picturePreview}
                            alt="Profile Preview"
                            className="picture-preview"
                        />
                    )}
                </div>


                <button type="submit">Sign Up</button>
            </form>
            <p className="signin-link">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
}
