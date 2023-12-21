/* eslint-disable react/prop-types */
import './UserProfile.css';


export default function UserProfile({ username, email, picture }) {
    return (
        <div className="user-profile-container">
            <img src={picture} alt="User" className="profile-picture" />
            <div className="user-info">
                <h2 className="username">{username}</h2>
                <p className="email">{email}</p>
            </div>
        </div>
    );
}

