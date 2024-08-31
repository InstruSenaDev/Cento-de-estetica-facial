import React, { createContext, useContext, useState } from 'react';
import Modalinicio from './Modalinicio'; 
import ModalRegistro from './ModalRegistro'; 

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const openModal = (type) => {
        setShowModal(false);
        setTimeout(() => {
            setModalType(type);
            setShowModal(true);
        }, 200); 
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
    };

    return (
        <ModalContext.Provider value={{ showModal, openModal, closeModal, modalType }}>
            {children}
            {modalType === 'login' && showModal && <Modalinicio closeModal={closeModal} />}
            {modalType === 'SignUp' && showModal && <ModalRegistro closeModal={closeModal} />}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
