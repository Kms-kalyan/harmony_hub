import { MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
    onLogout: () => void;
}

//Function to log out the user and redirect to login page
const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.clear();
        // Call the provided onLogout function
        onLogout();

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
    );
};

export default Logout;
