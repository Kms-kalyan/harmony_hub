import React, { useState } from 'react';
import axios from 'axios';

interface SignUpProps {
    setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const SignUp: React.FC<SignUpProps> = ({ setIsSignup, setShowModal, setSuccessMessage, setErrorMessage }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const handleSignUp = async () => {
        setSuccessMessage('');
        setErrorMessage('');
        let errorVar;

        try {
            // Call your signup API with the provided details
            // Check if emailId is valid

            if (!isValidEmail(emailId)) {
                errorVar = 'email';
                throw new Error('Invalid EmailId');
            }

            if (!isValidMobileNumber(mobileNumber)) {
                errorVar = 'mobileNum';
                throw new Error('Invalid Mobile Number');
            }

            const signupResponse = await axios.post('http://localhost:3001/api/users/', {
                userName: userName,
                password: password,
                emailId: emailId,
                mobileNumber: mobileNumber,
            });

            setEmailId('');
            setPassword('');
            setUserName('');
            setMobileNumber('');

            setShowModal(true);
            setSuccessMessage('User registered successfully');
            console.log('Signup Response:', signupResponse);
        } catch (error : any) {
            setShowModal(true);
            if (errorVar === 'email') {
                setErrorMessage('Invalid Email Id');
            } else if (errorVar === 'mobileNum') {
                setErrorMessage('Invalid Mobile Number');
            } else {
                setErrorMessage(error.response ? error.response.data.error : 'An unexpected error occurred.');
            }
        }
    };

    const isValidMobileNumber = (value: string): boolean => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(value);
    };

    const isValidEmail = (value: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    return (
        <div className='login-container'>
            <label className="labels">
                <span style={{marginRight:'230px'}}>UserName:</span>
                <br/>
                <input className="inputs" type="text" placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </label>
            <br />

            <label className="labels">
                <span style={{marginRight:'245px'}}>Password:</span>
                <br/>
                <input className="inputs" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />

            <label className="labels">
                <span style={{marginRight:'255px'}}>EmailId:</span>
                <br/>
                <input className="inputs" type="text" placeholder="email id" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </label>
            <br />

            <label className="labels">
                <span style={{marginRight:'200px'}}>MobileNumber:</span>
                <br/>
                <input className="inputs" type="text" placeholder="mobile number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </label>
            <br />

            <button onClick={handleSignUp} className="buttons">
                SignUp
            </button>
        </div>
    );
};

export default SignUp;
