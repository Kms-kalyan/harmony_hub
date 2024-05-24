// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import user from "../assets/user.png";
import Navbar from './Navbar';
import { TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Defining the ModalProps interface
interface ModalProps {
    onClose: () => void;
}

// Placeholder functions for updating different account details
const changeEmail = () => {

};

const changeUsername = () => {

};

const changePhone = () => {

};

// Defining the Details interface for user account information
interface Details {
    userName: string;
    emailId: string;
    mobileNumber: string;
}

// Main component for updating account details
const UpdateAccountDetailsModal: React.FC<ModalProps> = ({ onClose }) => {

    // State for storing user account details
    const [details, setDetails] = useState<Details[]>([]);

    // useEffect hook to fetch user details from the server on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching user ID from local storage
                const userID = localStorage.getItem('userID');
                // Making a GET request to retrieve user details
                const loginResponse = await axios.get(`http://localhost:3001/api/users/${userID}`);
                const email = loginResponse.data.emailId;
                const username = loginResponse.data.userName;
                const phone = loginResponse.data.mobileNumber;

                // Setting the fetched details into state
                setEmail(email);
                setUsername(username);
                setPhone(phone);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // State variables for user input and validation errors
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [validationErrors, setValidationErrors] = useState<{ email: string; username: string; phone: string }>({
        email: '',
        username: '',
        phone: ''
    });

    // Function to handle input changes and update validation errors
    const handleInputChange = (inputField: string, inputValue: string) => {
        if (inputField === "email") {
            if (!inputValue) {
                setValidationErrors((errs) => ({ ...errs, email: "Email Cannot Be Empty" }));
            } else {
                setEmail(inputValue);
                setValidationErrors((errs) => ({ ...errs, email: "" }));
            }
        }
        if (inputField === "username") {
            if (!inputValue) {
                setValidationErrors((errs) => ({ ...errs, username: "Username Cannot Be Empty" }));
            } else {
                setUsername(inputValue);
                setValidationErrors((errs) => ({ ...errs, username: "" }));
            }
        }
        if (inputField === "phone") {
            if (!inputValue) {
                setValidationErrors((errs) => ({ ...errs, phone: "Phone Cannot Be Empty" }));
            } else {
                setPhone(inputValue);
                setValidationErrors((errs) => ({ ...errs, phone: "" }));
            }
        }
    };

    // Function to handle the update of account details
    const handleUpdate = async () => {
        try {
            // Regular expression for validating email format
            const emailRegEx: RegExp = new RegExp(/\S+@\S+.\S+/);
            // Validation checks
            if (!email) {
                setValidationErrors((prevErrors) => ({ ...prevErrors, email: "Email Cannot Be Empty" }));
                return;
            } else if (!username) {
                setValidationErrors((prevErrors) => ({ ...prevErrors, username: "Username Cannot Be Empty" }));
                return;
            } else if (!phone) {
                setValidationErrors((prevErrors) => ({ ...prevErrors, phone: "Phone Cannot Be Empty" }));
                return;
            } else if (!emailRegEx.test(email)) {
                setValidationErrors((prevErrors) => ({ ...prevErrors, email: "Enter a valid email" }));
                return;
            } else {
                // Clearing validation errors
                setValidationErrors({ email: "", phone: "", username: "" });

                // Updating user data on the server
                const userID = localStorage.getItem('userID');
                const updateData = {
                    emailId: email,
                    userName: username,
                    mobileNumber: phone
                };

                await axios.put(`http://localhost:3001/api/users/${userID}`, updateData);
                onClose(); // Closing the modal after successful update
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    // Rendering the modal content
    return (
        <div style={{
            position: 'fixed',
            top: '61%',
            left: '58%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '5px',
            zIndex: '999'
        }}>
            <h2>Update Account Details</h2>
            {<div style={{ width: '100%', gap: '15px', display: 'flex', flexDirection: 'column', textAlign: 'left'}}>

                <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left'}}>
                    <TextField error={Boolean(validationErrors.email)} helperText={validationErrors.email} variant="outlined" onChange={(e) => { handleInputChange("email", e.target.value) }} value={email} style={{ width: '100%' }}></TextField>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
                    <TextField error={Boolean(validationErrors.username)} helperText={validationErrors.username}  variant="outlined" onChange={(e) => { handleInputChange("username", e.target.value) }} value={username} style={{ width: '100%' }}></TextField>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
                    <TextField error={Boolean(validationErrors.phone)} helperText={validationErrors.phone} variant="outlined" onChange={(e) => { handleInputChange("phone", e.target.value) }} value={phone} style={{ width: '100%' }}></TextField>
                </div>

            </div>}
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%', width: '100%', gap: '50%'}}>
                <button onClick={handleUpdate} style={{ width: '30%', backgroundColor: 'rgb(43, 38, 40)', color: '#ffffff', fontSize: '100%' }}>Update</button>
                {/* <button onClick={handleClose} style={{ width: '30%', backgroundColor: 'rgb(43, 38, 40)', color: '#ffffff', fontSize: '100%' }}>Cancel</button> */}
                <button onClick={onClose} style={{ width: '30%', backgroundColor: 'rgb(43, 38, 40)', color: '#ffffff', fontSize: '100%' }}>Close</button>
            </div>

        </div>
    );
};

// Main Account component
export default function Account() {
    // State for managing the visibility of the update modal
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const backgroundColor = '#2B2628';
    const navigate = useNavigate();

    // Function to open the update account details modal
    const handleUpdateAccountDetails = () => {
        setUpdateModalOpen(true);
    };

    // Function to delete the user account
    const handleDeleteAccount = async () => {
        const userID = localStorage.getItem('userID')
        console.log('localStorage value: ',localStorage)
        const loginResponse = await axios.delete(`http://localhost:3001/api/users/${userID}`)
        navigate(`/`);
    };

    // Styling for the main account card
    const cardCss: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        marginTop: '50px',
        marginLeft: '20%'
    };

    // Rendering the main account component
    return (
        <div
            style={{
                backgroundColor: `${backgroundColor}`,
                height: '100vh',
                overflowX: 'hidden',
            }}
        >
            <Navbar />
            <div style={cardCss}>
                <img
                    src={user}
                    alt="Profile Pic"
                    style={{ width: '100px', height: '100px', color: '#ffffff', borderRadius: '50%', backgroundColor: '#ffffff', marginBottom: '10%' }}
                />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button onClick={handleUpdateAccountDetails} style={{ width: '20%', backgroundColor: 'rgb(43, 38, 40)', color: '#ffffff', marginRight: '900px', marginBottom: '5%', fontSize: '100%', border: '0px' }}>
                        Update Account Details
                    </button>

                    <button onClick={() => handleDeleteAccount()} style={{ width: '15%', backgroundColor: 'rgb(43, 38, 40)', color: '#ffffff', marginRight: '900px', fontSize: '100%', border: '0px' }}>
                        Delete Account
                    </button>
                </div>
            </div>

            {isUpdateModalOpen && (
                <UpdateAccountDetailsModal onClose={() => setUpdateModalOpen(false)} />
            )}
        </div>
    );
}
