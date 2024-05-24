import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import CustomModal from './CustomModal';

const ForgotPassword : React.FC =  () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleForgotPassword = async () => {
        try {
            // Calling forgot password API with the provided email
            const response = await axios.post('http://localhost:3001/api/users/forgot-password', {
                email: email,
            });

            localStorage.setItem('email',email);
            setShowModal(true);
            setSuccessMessage('Redirecting..');

            //Set time out before redirecting to new page
            setTimeout(() => {
                navigate('/reset-password');
            }, 1000);
        } catch (error : any) {
            setShowModal(true);
            setErrorMessage(error.response ? error.response.data.error : 'An unexpected error occurred.');
        }
    };

    return (
        <div>
            <label className="labels"  style={{marginTop:'10%'}}>
                <span style={{paddingRight:"26%", fontWeight:'bold'}}>Email:</span>
                <br/>
                <input className="inputs" type="text" placeholder="Enter your email" value={email} style={{width:"30%", marginTop:'0%'}} onChange={handleEmailChange} />
            </label>
            <br />

            <button className='buttons' style={{width:"30%"}} onClick={handleForgotPassword}>Reset Password</button>

            <CustomModal onClose={() => setShowModal(false)} message={errorMessage ? errorMessage : successMessage} showModal={showModal}/>
        </div>
    );
};

export default ForgotPassword;
