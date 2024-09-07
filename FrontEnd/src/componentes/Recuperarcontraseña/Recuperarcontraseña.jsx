// RecoverPassword.jsx
import React, { useState } from 'react';
import supabase from '../../supabase/supabaseconfig';
import "./Recuperarcontraseña.css";

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase.auth.resetPasswordForEmail(email,{
            redirectTo:'https://localhost:5173/NuevaContraseña'
        });

        if (error) {
            setMessage("Error al enviar el correo de recuperación. Por favor, intenta de nuevo.");
        } else {
            setMessage("Correo de recuperación enviado. Por favor, revisa tu bandeja de entrada.");
        }
    };

    return (
        <div className='recover-body'>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ingrese su correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Recuperar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RecoverPassword;
