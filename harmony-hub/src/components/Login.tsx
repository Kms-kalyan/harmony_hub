// Importing necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Defining the LoginProps interface
interface LoginProps {
    setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

//Login method that calls login api and displays the response

// Main Login component

const Login: React.FC<LoginProps> = ({ setIsSignup, setShowModal, setSuccessMessage, setErrorMessage }) => {
    // State variables for user input
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation('common');

    // Function to handle the login process
    const handleLogin = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        try {


            //RESTful API call to login API

            const loginResponse = await axios.post('http://localhost:3001/api/users/login', {
                userName: userName,
                password: password,
            });

            // API returns a token on successful login

            const token = loginResponse.data.token;

            // Saving relevant data in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);
            localStorage.setItem('userID' , loginResponse.data.user._id);

            // Clearing input fields
            setPassword('');
            setUserName('');

            navigate('/home');
            console.log("Local Storage Data : ",localStorage);
        } catch (error : any) {

            setShowModal(true);
            setErrorMessage(error.response ? error.response.data.error : 'An unexpected error occurred.');
        }
    };

    // Rendering the login form
    return (
        <div>
            {/* Add your login UI elements and form inputs here */}
            <label>
                {t('username.text.label')}
                <input type="text" placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </label>
            <br />

            <label>
                {t('password.text.label')}
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />

            <button onClick={handleLogin} className="button">
                {t('login.button.label')}
            </button>
        </div>
    );
};

// Exporting the Login component
export default Login;
