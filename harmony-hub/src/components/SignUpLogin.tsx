import React, { useState } from 'react';
import Login from './Login';
import SignUp from './Signup';
import CustomModal from './CustomModal';
import { useNavigate } from 'react-router-dom';


const SignUpLogin: React.FC = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPasswordClick = () => {
        setShowModal(true);
        setSuccessMessage("Redirecting..");
        // Set a timeout to navigate after 2 seconds
        setTimeout(() => {
            navigate('/forgot-password');
        }, 2000);
    };


    return (
        <div>
            <h1 className="harmony" style={{color : "white"}}>Harmony Hub</h1>
            {isSignup ? (
                <SignUp
                    setIsSignup={setIsSignup}
                    setShowModal={setShowModal}
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                />
            ) : (
                <Login
                    setIsSignup={setIsSignup}
                    setShowModal={setShowModal}
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                />
            )}

            <p style={{color :'white'}}>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <span className="login" onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? ' Login' : ' Sign Up'}
                </span>
            </p>
            <span className="login" onClick={handleForgotPasswordClick}>
                Forgot Password?
            </span>
            <CustomModal onClose={() => setShowModal(false)} message={errorMessage ? errorMessage : successMessage} showModal={showModal}/>
        </div>
    );
};

export default SignUpLogin;
