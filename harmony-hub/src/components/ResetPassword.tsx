import React, { useState } from 'react';
import axios from 'axios';
import CustomModal from './CustomModal';
import {useNavigate} from 'react-router-dom';

const ResetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        // Check if new password and confirm password match
        setPasswordMatch(event.target.value === newPassword);
    };

    const handleSubmit = async () => {

        try {
            let userID = localStorage.getItem('userID');
            const updateData = {
                password: newPassword
            };
            userID = localStorage.getItem('email');
            await axios.put(`http://localhost:3001/api/users/${userID}`, updateData);

            console.log('New Password:', newPassword);
            console.log('UserID is : ',userID);
            setShowModal(true);
            setSuccessMessage('Password Changed Successfully');

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }catch(error : any){
            setShowModal(true);
            setErrorMessage('Unable to change password');
            console.error(error);
        }
    };

    return (
        <div>
            <label style={{marginTop:'10%'}} className="labels">
                New Password:
            </label>
            <input className="inputs" type="text" value={newPassword} style={{width:'30%'}} onChange={handleNewPasswordChange} />
            <br />

            <label className="labels">Confirm Password:</label>
            <input className="inputs" type="password" value={confirmPassword} style={{width:'30%'}} onChange={handleConfirmPasswordChange} />
            {!passwordMatch && <div style={{ color: 'red' }}>Passwords do not match</div>}
            <br />

            <button className="buttons" style={{width:'30%'}} onClick={handleSubmit} disabled={!passwordMatch}>
                Reset Password
            </button>

            <CustomModal onClose={() => setShowModal(false)} message={errorMessage ? errorMessage : successMessage} showModal={showModal}/>
        </div>
    );
};

export default ResetPassword;
