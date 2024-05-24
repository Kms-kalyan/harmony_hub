import React from "react";

interface CustomModalProps {
    onClose: () => void;
    message: string;
    showModal: boolean;
}

//Function to display pop-up message on the screen
const CustomModal: React.FC<CustomModalProps> = ({ onClose, message, showModal }) => {
    return (
        <div className={`modal${showModal ? ' show' : ''}`}>
            <div className="modalContent">
                <span className="close" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default CustomModal;
